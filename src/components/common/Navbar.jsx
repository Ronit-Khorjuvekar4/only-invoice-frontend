// src/components/common/navbar.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const navs = [
  {
    navName: 'All Client List',
    navLink: "/"
  },
  {
    navName: 'Add a Client',
    navLink: "/add-client"
  }
]

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;



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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;