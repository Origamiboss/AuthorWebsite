import { motion } from "framer-motion";

function Slide({ slide }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
                delay: (slide.delay_ms ?? 0) / 1000,
                duration: (slide.duration_ms ?? 500) / 1000,
            }}
            className="w-full h-full flex flex-col items-center justify-center rounded-xl p-6 text-heather"
            style={{
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-6 rounded-lg text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
        </motion.div>
    );
}

export default Slide;
