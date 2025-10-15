// src/components/common/navbar.jsx
'use client'
import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

const navs = [
  {
    navName: 'All Client List',
    navLink: "/main/all-clients"
  },
  {
    navName: 'Add a Client',
    navLink: "/main/add-client"
  }
]

const Navbar = () => {

  const { user, logout } = useContext(AuthContext)

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) return null;

  return (
    <AppBar position="static">
      <Toolbar>

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {
            navs.map((n) => (
              <Link href={n.navLink} key={n.navLink}>
                <Button color="inherit" sx={{ mr: 2 }}>{n.navName}</Button>
              </Link>
            ))
          }
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <img src="/logo.png" alt="Company Logo" style={{ height: 40 }} />
        </Box>

        <Box>
          <Button onClick={logout} sx={{ color: '#fff' }}>Logout</Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;