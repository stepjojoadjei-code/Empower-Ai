import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-gray-800/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-extrabold text-white mb-4">About Stellar Solutions</h2>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Founded on the principle of innovation, Stellar Solutions is dedicated to helping businesses navigate the complexities of the digital landscape. Our team of experts brings decades of combined experience in software engineering, artificial intelligence, and cybersecurity.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            We believe in building partnerships, not just products. By understanding your unique challenges and goals, we craft bespoke solutions that drive growth, enhance security, and create lasting value.
                        </p>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-gray-700 p-6 rounded-lg text-center">
                                <span className="text-4xl font-bold text-blue-500">10+</span>
                                <p className="text-gray-300 mt-2">Years of Experience</p>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg text-center">
                                <span className="text-4xl font-bold text-blue-500">150+</span>
                                <p className="text-gray-300 mt-2">Projects Completed</p>
                            </div>
                             <div className="bg-gray-700 p-6 rounded-lg text-center">
                                <span className="text-4xl font-bold text-blue-500">98%</span>
                                <p className="text-gray-300 mt-2">Client Satisfaction</p>
                            </div>
                             <div className="bg-gray-700 p-6 rounded-lg text-center">
                                <span className="text-4xl font-bold text-blue-500">50+</span>
                                <p className="text-gray-300 mt-2">Expert Engineers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
