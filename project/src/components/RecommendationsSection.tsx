import { Image, Zap, Eye, Search } from 'lucide-react';

interface RecommendationCategory {
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

interface RecommendationsSectionProps {
  recommendations: {
    images: string[];
    performance: string[];
    accessibility: string[];
    seo: string[];
  };
}

export default function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  const categories: RecommendationCategory[] = [
    {
      title: 'Image Optimization',
      icon: <Image className="w-5 h-5" />,
      items: recommendations.images,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Performance Optimization',
      icon: <Zap className="w-5 h-5" />,
      items: recommendations.performance,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      title: 'Accessibility Improvements',
      icon: <Eye className="w-5 h-5" />,
      items: recommendations.accessibility,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'SEO Enhancements',
      icon: <Search className="w-5 h-5" />,
      items: recommendations.seo,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">General Recommendations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div key={index} className={`rounded-lg border-2 p-6 ${category.color}`}>
            <div className="flex items-center gap-2 mb-4">
              {category.icon}
              <h3 className="font-semibold text-lg">{category.title}</h3>
            </div>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
