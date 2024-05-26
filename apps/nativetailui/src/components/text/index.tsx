import { MotiText } from "moti";
import React, { forwardRef } from "react";
import { separateTextClasses, useTw } from "../../tw";


type TextProps = React.ComponentProps<typeof MotiText> & {
    className?: string;
};
const Text = forwardRef<typeof MotiText, TextProps>(
    ({ className = "text-foreground", children, ...props }, ref) => {
        const tw = useTw();

        const { inClasses, outClasses, nonStateClasses } = separateTextClasses(className);
        return (
            <MotiText
                from={tw`${inClasses}`}
                animate={tw`${nonStateClasses}`}
                exit={tw`${outClasses}`}
                style={tw.style("text-foreground", className)}
                {...props}
                ref={ref}
            >
                {children}
            </MotiText>
        );
    }
);
export {
    Text
};
