import { motion } from "framer-motion";

interface BouncingTextProps {
    text: string;
    className?: string;
}

const BouncingText = ({ text, className = "" }: BouncingTextProps) => {
    const characters = text.split("");

    return (
        <div className={`flex justify-center overflow-hidden py-4 ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ y: 0, rotate: 0 }}
                    animate={{
                        y: [0, -44, 0], // -2.75rem is approx -44px
                        rotate: [0, -360, 0], // -1turn is -360deg
                    }}
                    transition={{
                        duration: 1.4, // Total duration (600ms up + 800ms down)
                        times: [0, 0.43, 1], // Split based on duration ratio (600/1400 ≈ 0.43)
                        ease: ["easeOut", "backOut"], // easeOutExpo approx -> easeOut, outBounce -> backOut/bounce
                        delay: index * 0.05, // stagger(50)
                        repeat: Infinity,
                        repeatDelay: 1, // loopDelay: 1000
                    }}
                    className="inline-block origin-center"
                    style={{
                        marginRight: char === " " ? "0.3em" : "0.02em",
                        letterSpacing: "0.06em"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};

export default BouncingText;
