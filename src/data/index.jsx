import React from 'react';
import { Monitor, Users, Sparkles } from 'lucide-react';

// ---------- Certifications Data ----------
export const certCategories = [
  {
    id: 'health',
    label: 'Health & Psychology',
    icon: <i className="fa-solid fa-stethoscope" />,
    color: '#e8f4ff',
    accent: '#4DA6FF',
    main: true,
    certs: [
      { title: 'Diploma in Mental Health',          issuer: 'Alison',                                    meaning: 'Understanding emotional well-being',   link: '#' },
      { title: 'Basic Life Support',                issuer: 'NHCPS',                                     meaning: 'Emergency response and CPR',           link: '#' },
      { title: 'Child & Adolescent Psychology',     issuer: 'Alison',                                    meaning: 'Developmental understanding',          link: '#' },
      { title: 'Counselling',                       issuer: 'ELC elearning College',                     meaning: 'Emotional support techniques',         link: '#' },
      { title: 'Eating Disorder Awareness',         issuer: 'Oxford Home Study Center',                  meaning: 'Mental and physical health insight',   link: '#' },
      { title: 'Intellectual Disability Caregiver', issuer: 'Alison',                                    meaning: 'Support systems knowledge',            link: '#' },
      { title: 'Drug Use & Harm Reduction',         issuer: 'London School of Hygiene and Tropical Medicine', meaning: 'Safer health practices',          link: '#' },
      { title: '2nd Runner-Up — Biology Olympiad',  issuer: 'Regional Round · Bangladesh',               meaning: 'Excellence in biological sciences',   link: '#', special: true },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    icon: <Monitor size={18} />,
    color: '#f0f8ff',
    accent: '#2492f0',
    certs: [
      { title: 'HTML & CSS',        issuer: 'Sololearn', meaning: 'Web design basics',      link: '#' },
      { title: 'Python Developer',  issuer: 'Sololearn', meaning: 'Structured programming', link: '#' },
    ],
  },
  {
    id: 'social',
    label: 'Social Impact',
    icon: <Users size={18} />,
    color: '#fff8fe',
    accent: '#c47bff',
    certs: [
      { title: 'Prevention of Sexual Harassment', issuer: 'UNICEF', meaning: 'Social Awareness' },
    ],
  },
  {
    id: 'additional',
    label: 'Additional',
    icon: <Sparkles size={18} />,
    color: '#f8fffc',
    accent: '#27ae60',
    small: true,
    certs: [
      { title: 'Digital Marketing', issuer: 'Google', meaning: 'SEO and online presence',   link: '#' },
      { title: 'Finance Basics',    issuer: 'HP',     meaning: 'Financial understanding',   link: '#' },
    ],
  },
];

// ---------- Quotes Data ----------
export const quotes = [
  { text: "Knowledge is the lost property of the believer.", source: "Prophet Muhammad ﷺ" },
  { text: "Educate a woman and you educate a generation.", source: "African Proverb" },
  { text: "The best among you are those who have the best character.", source: "Prophet Muhammad ﷺ" },
];