
import React from 'react';
import { QuoteIcon } from './icons/QuoteIcon';

const testimonialsData = [
    {
        quote: "Stellar Solutions transformed our operations with their AI integration. Their team is knowledgeable, responsive, and a pleasure to work with. We saw a 40% increase in efficiency within the first quarter.",
        name: "Jane Doe",
        title: "CEO, Innovate Inc."
    },
    {
        quote: "The cybersecurity audit they performed was incredibly thorough. We now feel much more secure thanks to their expertise and proactive recommendations. A must-have partner for any tech company.",
        name: "John Smith",
        title: "CTO, SecureNet"
    },
    {
        quote: "Migrating to the cloud was a daunting task, but Stellar Solutions made it seamless. Their strategic approach minimized downtime and has already led to significant cost savings. Highly recommended!",
        name: "Emily White",
        title: "COO, DataFlow"
    }
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonialsData[0] }> = React.memo(({ testimonial }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center h-full hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300">
        <div className="text-blue-500/50 mb-4">
            <QuoteIcon />
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
        <div>
            <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{testimonial.title}</p>
        </div>
    </div>
));

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What Our Clients Say</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Real stories from businesses we've helped empower.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
