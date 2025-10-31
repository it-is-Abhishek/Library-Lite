import express from "express";
import supabase from "../supabase/supabase.js";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullName, confirmPassword } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Validate full name
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        error: "Full name is required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Validate password match (if confirmPassword is provided)
    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create user record in database using Prisma
    if (data.user) {
      try {
        const dbUser = await prisma.user.create({
          data: {
            authId: data.user.id,
            email: data.user.email,
            fullName: fullName.trim(),
            name: fullName.trim().split(' ')[0], // Use first name
          },
        });

        res.status(201).json({
          message: "User created successfully",
          user: {
            ...data.user,
            dbUser: dbUser,
          },
          session: data.session,
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        // If DB creation fails, we might want to delete the auth user
        // For now, just return success with auth data
        res.status(201).json({
          message: "User created in auth, but database sync failed",
          user: data.user,
          session: data.session,
          warning: "Please contact support if you experience issues",
        });
      }
    } else {
      res.status(201).json({
        message: "User created successfully",
        user: data.user,
        session: data.session,
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Get user from database
    let dbUser = null;
    if (data.user) {
      try {
        dbUser = await prisma.user.findUnique({
          where: { authId: data.user.id },
        });

        // If user doesn't exist in DB, create them
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              authId: data.user.id,
              email: data.user.email,
              fullName: data.user.user_metadata?.full_name || null,
              name: data.user.user_metadata?.full_name || email.split('@')[0],
            },
          });
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
    }

    // Return user data and session
    res.status(200).json({
      message: "Login successful",
      user: {
        ...data.user,
        dbUser: dbUser,
      },
      session: data.session,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route
router.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user route
router.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Get user from database
    let dbUser = null;
    if (user) {
      try {
        dbUser = await prisma.user.findUnique({
          where: { authId: user.id },
          include: {
            borrowings: {
              include: {
                book: {
                  include: {
                    author: true,
                  },
                },
              },
            },
          },
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
      }
    }

    res.status(200).json({ 
      user: {
        ...user,
        dbUser: dbUser,
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
