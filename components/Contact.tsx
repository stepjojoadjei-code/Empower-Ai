import React from 'react';

const Contact: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you shortly.");
        // In a real app, you'd handle form submission here.
    };

    return (
        <section id="contact" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white">Get In Touch</h2>
                    <p className="text-lg text-gray-400 mt-4">Have a project in mind? We'd love to hear from you.</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Name</label>
                            <input type="text" id="name" name="name" required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
                            <textarea id="message" name="message" rows={5} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="text-center">
                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
