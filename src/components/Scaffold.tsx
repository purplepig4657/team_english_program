import { Box } from "@mui/material"
import React from "react"
import { drawerWidth } from "../constants/GlobalConstants"

type ScaffoldProps = {
    children?: React.ReactNode,
    height?: string,  // <length>
    width?: string,  // <length>
    minheight?: string,  // <length>
    minwidth?: string,  // <length>
    id?: string,
    className?: string
}

const scaffoldConstant = {
    SCREEN_HEIGHT: '100vh',
    SCREEN_WIDTH: '100vw',
    SCREEN_MIN_WIDTH: '280px'
}

const Scaffold: React.FC<ScaffoldProps> = ({
    children = undefined,
    height = scaffoldConstant.SCREEN_HEIGHT,
    width = scaffoldConstant.SCREEN_WIDTH,
    minheight = undefined,
    minwidth = scaffoldConstant.SCREEN_MIN_WIDTH,
    id = undefined,
    className = undefined,
    ...otherAttributes
}) => {
    return (
        <Box id={id} className={className}
            sx={{
                height: height,
                width: { sm: `calc(${scaffoldConstant.SCREEN_WIDTH} - ${drawerWidth}px)` },
                pt: "60px",
                ml: { sm: `${drawerWidth}px` },
                minHeight: minheight,
                minWidth: minwidth,
                overflow: 'auto',
                ...otherAttributes
            }}
        >
            {children}
        </Box>
    )
}

export default Scaffold;
