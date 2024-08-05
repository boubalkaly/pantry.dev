import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (

    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 6,
      }}
    >
      <Typography variant="h2">The Ultimate Item Tracker</Typography>
      <Typography variant="subtitle1">Never lose track of your items again</Typography>
      <Link href="/items"><Button variant="contained" style={{}}>Get started!</Button></Link>


    </Stack >

  );
}
