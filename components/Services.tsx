
import React from 'react';
import { AiDevIcon } from './icons/AiDevIcon';
import { CybersecurityIcon } from './icons/CybersecurityIcon';
import { CloudIcon } from './icons/CloudIcon';
import { DataIcon } from './icons/DataIcon';

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        icon: <AiDevIcon />,
        title: "AI & Automation",
        description: "Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent products."
    },
    {
        icon: <CybersecurityIcon />,
        title: "Cybersecurity",
        description: "Protect your digital assets with our robust security solutions, from threat assessment to incident response."
    },
    {
        icon: <CloudIcon />,
        title: "Cloud Solutions",
        description: "Scale your business with our secure and flexible cloud infrastructure services, including migration, management, and optimization."
    },
    {
        icon: <DataIcon />,
        title: "Data Analytics",
        description: "Turn your data into actionable insights. We help you collect, process, and visualize data to make informed decisions."
    }
];

const ServiceCard: React.FC<{ service: Service }> = React.memo(({ service }) => (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300">
        <div className="text-blue-500 mb-4">
            {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
    </div>
));


const Services: React.FC = () => {
    return (
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Services</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">We offer a comprehensive suite of technology services.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
