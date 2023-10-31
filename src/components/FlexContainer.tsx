import React from "react"

type FlexContainerProps = {
    children?: React.ReactNode,
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse',
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
    width?: string,  // <length>
    height?: string  // <length>
    id?: string,
    className?: string
}

const FlexContainer: React.FC<FlexContainerProps> = ({
    children = undefined,
    flexDirection = 'row',
    flexWrap = undefined,
    justifyContent = 'flex-start',
    alignItems = undefined,
    alignContent = undefined,
    width = 'auto',
    height = 'auto',
    id = undefined,
    className = undefined,
    ...otherAttributes
}) => {
    return <div id={id} className={className} style={{
        display: 'flex',
        flexDirection: flexDirection,
        flexWrap: flexWrap,
        justifyContent: justifyContent,
        alignItems: alignItems,
        alignContent: alignContent,
        width: width,
        height: height,
        ...otherAttributes
    }}>
        {children}
    </div>
};

export default FlexContainer;
