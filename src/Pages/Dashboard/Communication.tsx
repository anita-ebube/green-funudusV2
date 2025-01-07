import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

const FAQPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([
        { id: 1, question: 'What is the Pay-As-You-Go Microinsurance Platform?', answer: 'The Pay-As-You-Go Microinsurance Platform is a service that allows farmers to insure their animals by paying small insurance fees when they purchase feed or medicine.' },
        { id: 2, question: 'How do farmers pay for the insurance?', answer: 'Farmers pay for the insurance by adding small fees to their purchases of animal feed or medicine.' },
        { id: 3, question: 'What is the main goal of this platform?', answer: 'The main goal is to help farmers protect their animals and financial investments with affordable and accessible insurance.' },
        { id: 4, question: 'What is the main goal of this platform?', answer: 'The main goal is to help farmers protect their animals and financial investments with affordable and accessible insurance.' },
        { id: 5, question: 'What is the main goal of this platform?', answer: 'The main goal is to help farmers protect their animals and financial investments with affordable and accessible insurance.' },
    ]);

    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleAnswer = (id: number) => {
        setActiveId((prevId) => (prevId === id ? null : id));
    };

    const pageTransition = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.7 },
    };

    return (
        <motion.div
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            className="min-h-screen pt-8 lg:ml-[242px] px-6"
        >

            <div className="space-y-6">
                <h1 className="text-black">Frequently Asked Questions</h1>
                {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-md p-4">
                        <button
                            onClick={() => toggleAnswer(faq.id)}
                            className="flex justify-between w-full text-left font-medium text-gray-800"
                        >
                            <span>{faq.question}</span>
                            <span>{activeId === faq.id ? '-' : '+'}</span>
                        </button>
                        {activeId === faq.id && <p className="mt-2 text-gray-600 px-5">{faq.answer}</p>}
                    </div>
                ))}
                <h2>To make more enquiries, <a href="https://wa.me/2347039780118?text=Welcome%20to%20PayGo%2C%20how%20can%20we%20help%20you" target="_blank" className="text-blue-500 hover:text-blue-700">click here</a> to chat with us on WhatsApp.</h2>

            </div>
        </motion.div>
    );
};

export default FAQPage;
