import React, { useState } from 'react';
import { User, GraduationCap, Briefcase, Clock, Coins, Calendar } from 'lucide-react';

// interface SalaryFormProps {
//   onSubmit: (data: {
//     gender: string;
//     age: number;
//     education: string;
//     jobTitle: string;
//     experience: number;
//     currentSalary: number;
//     currency: string;
//   }) => void;
//   isLoading: boolean;
// }
interface SalaryFormProps {
    onSubmit: (data: {
      education: string;
      experience: number;
      jobRole: string;
      industry: string;
    }) => void;
    isLoading: boolean;
  }
const educationLevels = [
  'High School',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Diploma',
  'Other'
];

const jobTitles = [
  "Software Engineer",
  "Data Analyst",
  "Senior Manager",
  "Sales Associate",
  "Director",
  "Marketing Analyst",
  "Product Manager",
  "Sales Manager",
  "Marketing Coordinator",
  "Senior Scientist",
  "Software Developer",
  "HR Manager",
  "Financial Analyst",
  "Project Manager",
  "Customer Service Rep",
  "Operations Manager",
  "Marketing Manager",
  "Senior Engineer",
  "Data Entry Clerk",
  "Sales Director",
  "Business Analyst",
  "VP of Operations",
  "IT Support",
  "Recruiter",
  "Financial Manager",
  "Social Media Specialist",
  "Software Manager",
  "Junior Developer",
  "Senior Consultant",
  "Product Designer",
  "CEO",
  "Accountant",
  "Data Scientist",
  "Marketing Specialist",
  "Technical Writer",
  "HR Generalist",
  "Project Engineer",
  "Customer Success Rep",
  "Sales Executive",
  "UX Designer",
  "Operations Director",
  "Network Engineer",
  "Administrative Assistant",
  "Strategy Consultant",
  "Copywriter",
  "Account Manager",
  "Director of Marketing",
  "Help Desk Analyst",
  "Customer Service",
  "Business Intelligence",
  "Event Coordinator",
  "VP of Finance",
  "Graphic Designer",
  "UX Researcher",
  "Social Media Manager",
  "Senior Data Scientist",
  "Junior Accountant",
  "Digital Marketing",
  "IT Manager",
  "Business Development",
  "Senior Financial Analyst",
  "Web Developer",
  "Research Director",
  "Technical Support",
  "Creative Director",
  "Senior Software Engineer",
  "Human Resources Director",
  "Content Marketing",
  "Technical Recruiter",
  "Sales Representative",
  "Chief Technology Officer",
  "Junior Designer",
  "Financial Advisor",
  "Junior Account Manager",
  "Senior Project Manager",
  "Principal Scientist",
  "Supply Chain Manager",
  "Senior Marketing",
  "Training Specialist",
  "Research Scientist",
  "Junior Software Developer",
  "Public Relations",
  "Operations Analyst",
  "Product Marketing",
  "Senior HR Manager",
  "Junior Web Developer",
  "Senior Project Coordinator",
  "Chief Data Officer",
  "Digital Content Producer",
  "IT Support Specialist",
  "Senior Graphic Designer",
  "Software Project Manager",
  "Supply Chain Analyst",
  "Senior Business Analyst",
  "Junior Marketing",
  "Office Manager",
  "Principal Engineer",
  "Junior HR Generalist",
  "Senior Product Manager",
  "Sales Operations Manager",
  "Senior Software Developer",
  "Junior Web Designer",
  "Senior Training Specialist",
  "Senior Research Scientist",
  "Junior Sales Representative",
  "Junior Data Analyst",
  "Senior Product Manager",
  "Junior Business Analyst",
  "Senior Sales Manager",
  "Senior Data Scientist",
  "Junior Project Manager",
  "Senior Accountant",
  "Director of Sales",
  "Junior Recruiter",
  "Senior Business Development",
  "Senior Product Designer",
  "Junior Customer Service Representative",
  "Senior IT Support",
  "Junior Financial Analyst",
  "Senior Operations",
  "Director of Human Resources",
  "Junior Software Engineer",
  "Senior Sales Representative",
  "Director of Product",
  "Junior Copywriter",
  "Senior Human Resources",
  "Junior Business Development",
  "Senior Account Manager",
  "Senior Researcher",
  "Junior HR Coordinator",
  "Senior Software Engineer",
  "Director of Finance",
  "Junior Data Scientist",
  "Senior UX Designer",
  "Junior Product Manager",
  "Senior IT Project Manager",
  "Senior Financial Analyst",
  "Senior Quality Assurance",
  "Senior Account Executive",
  "Director of Business Development",
  "Junior Social Media Manager",
  "Senior Data Analyst",
  "Junior Advertising",
  "Senior IT Consultant"
];


const currencies = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
];

export function SalaryForm({ onSubmit, isLoading }: SalaryFormProps) {
  const [formData, setFormData] = useState({
    gender: '',
    age: 0,
    education: '',
    jobTitle: '',
    experience: 0,
    currentSalary: 0,
    currency: 'INR'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatSalary = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat(getCurrencyLocale(currencyCode), {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getCurrencyLocale = (currencyCode: string) => {
    const localeMap: { [key: string]: string } = {
      'INR': 'en-IN',
      'USD': 'en-US',
      'EUR': 'de-DE',
      'GBP': 'en-GB',
      'AUD': 'en-AU',
      'CAD': 'en-CA',
      'SGD': 'en-SG',
      'JPY': 'ja-JP',
      'CNY': 'zh-CN',
      'AED': 'ar-AE'
    };
    return localeMap[currencyCode] || 'en-US';
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <User className="w-5 h-5" />
          Gender
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Calendar className="w-5 h-5" />
          Age
        </label>
        <input
          type="number"
          min="18"
          max="80"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <GraduationCap className="w-5 h-5" />
          Education Level
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.education}
          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          required
        >
          <option value="">Select Education</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Briefcase className="w-5 h-5" />
          Job Title
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          required
        >
          <option value="">Select Job Title</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Clock className="w-5 h-5" />
          Years of Experience
        </label>
        <input
          type="number"
          min="0"
          max="50"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.experience || ''}
          onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Coins className="w-5 h-5" />
          Currency
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.currency}
          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
          required
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Coins className="w-5 h-5" />
          Current Annual Salary
        </label>
        <input
          type="number"
          min="0"
          step="1000"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.currentSalary || ''}
          onChange={(e) => setFormData({ ...formData, currentSalary: Number(e.target.value) })}
          required
        />
        {formData.currentSalary > 0 && (
          <p className="mt-1 text-sm text-gray-500">
            {formatSalary(formData.currentSalary, formData.currency)}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Calculating...' : 'Predict Salary'}
      </button>
    </form>
  );
}