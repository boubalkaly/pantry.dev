import React from 'react'
import { Box, Stack, Link } from "@mui/material";
const NavBar = () => {
    return (
        <Box
            padding={2}
            borderBottom={1}
            borderColor="primary.main"
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Link href="/"><Box>Home</Box></Link>
                <Link href="/items"><Box>Items</Box></Link>
            </Stack>
        </Box >
    )
}

export default NavBar