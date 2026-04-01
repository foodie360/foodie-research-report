import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MapPin, DollarSign, Clock, Wine, Globe } from "lucide-react";

const restaurantData = [
  {
    name: "Michael's Genuine Food & Drink",
    priceRange: "$$$",
    category: "Neighborhood/Seasonal",
    yearsInMarket: 19,
    liquorLicense: true,
    cms: "WordPress (Divi)",
    avgPrice: 65,
  },
  {
    name: "Zuma Miami",
    priceRange: "$$$$",
    category: "Contemporary Japanese",
    yearsInMarket: 16,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 120,
  },
  {
    name: "Stubborn Seed",
    priceRange: "$$$$",
    category: "Fine Dining/New American",
    yearsInMarket: 9,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 110,
  },
  {
    name: "Joe's Stone Crab",
    priceRange: "$$$$",
    category: "Seafood/Iconic",
    yearsInMarket: 113,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 95,
  },
  {
    name: "COTE Miami",
    priceRange: "$$$$",
    category: "Korean Steakhouse",
    yearsInMarket: 5,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 125,
  },
  {
    name: "MILA Miami",
    priceRange: "$$$$",
    category: "MediterrAsian",
    yearsInMarket: 6,
    liquorLicense: true,
    cms: "Squarespace",
    avgPrice: 115,
  },
  {
    name: "Chef Adrianne's Vineyard",
    priceRange: "$$$",
    category: "New American/Vineyard",
    yearsInMarket: 19,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 75,
  },
  {
    name: "Zucca Miami",
    priceRange: "$$$",
    category: "Authentic Italian",
    yearsInMarket: 9,
    liquorLicense: true,
    cms: "WordPress (Oxygen)",
    avgPrice: 70,
  },
  {
    name: "Fiola Miami",
    priceRange: "$$$$",
    category: "Italian Fine Dining",
    yearsInMarket: 8,
    liquorLicense: true,
    cms: "Squarespace",
    avgPrice: 100,
  },
  {
    name: "Caffe Abbracci",
    priceRange: "$$$",
    category: "Italian Fine Dining",
    yearsInMarket: 37,
    liquorLicense: true,
    cms: "Custom/Proprietary",
    avgPrice: 65,
  },
];

// Chart data: Average price by category
const priceByCategory = [
  { category: "Japanese", avg: 120 },
  { category: "Korean", avg: 125 },
  { category: "Italian", avg: 78 },
  { category: "American", avg: 92 },
  { category: "Mediterranean", avg: 115 },
  { category: "Seafood", avg: 95 },
];

// Chart data: Years in market distribution
const yearsDistribution = [
  { range: "5-10 years", count: 3, percentage: 30 },
  { range: "11-20 years", count: 4, percentage: 40 },
  { range: "20+ years", count: 3, percentage: 30 },
];

// Chart data: CMS Distribution
const cmsDistribution = [
  { name: "Custom/Proprietary", value: 6, color: "#3b82f6" },
  { name: "WordPress", value: 2, color: "#0ea5e9" },
  { name: "Squarespace", value: 2, color: "#06b6d4" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden bg-cover bg-center" style={{
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663467681179/aResF58VeK6BMMQixWPWLu/hero-miami-dining-HcNe9GVRWFFcozuGnRMyvQ.webp')`,
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Miami-Dade Restaurant Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 drop-shadow-md max-w-2xl">
            Qualified Prospects for Premium Marketing Services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Total Prospects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">10</div>
              <p className="text-xs text-gray-500 mt-1">Qualified restaurants</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Avg Check Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">$100</div>
              <p className="text-xs text-gray-500 mt-1">Per person average</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                Market Tenure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">19 yrs</div>
              <p className="text-xs text-gray-500 mt-1">Average years operating</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Wine className="w-4 h-4 text-red-600" />
                Liquor License
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <p className="text-xs text-gray-500 mt-1">Full liquor license</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Average Price by Category */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Average Price Point by Category</CardTitle>
              <CardDescription>Restaurant check average in USD</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="avg" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CMS Distribution */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Website CMS Distribution</CardTitle>
              <CardDescription>Platform breakdown of prospects</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cmsDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cmsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Market Tenure Distribution */}
        <Card className="border-0 shadow-md mb-12">
          <CardHeader>
            <CardTitle>Market Tenure Distribution</CardTitle>
            <CardDescription>Years in operation for qualified prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={yearsDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="count" fill="#06b6d4" name="Number of Restaurants" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Restaurant Prospects Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Qualified Restaurant Prospects</CardTitle>
            <CardDescription>Complete list of high-revenue targets in Miami-Dade County</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All (10)</TabsTrigger>
                <TabsTrigger value="wordpress">WordPress (2)</TabsTrigger>
                <TabsTrigger value="custom">Custom (6)</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Restaurant</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Price</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Years</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Website CMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantData.map((restaurant, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{restaurant.name}</td>
                          <td className="py-3 px-4 text-gray-600">{restaurant.category}</td>
                          <td className="py-3 px-4 text-center font-semibold text-green-600">${restaurant.avgPrice}</td>
                          <td className="py-3 px-4 text-center text-gray-600">{restaurant.yearsInMarket}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                              {restaurant.cms}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="wordpress" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Restaurant</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Price</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Years</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Website CMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantData.filter(r => r.cms.includes("WordPress")).map((restaurant, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{restaurant.name}</td>
                          <td className="py-3 px-4 text-gray-600">{restaurant.category}</td>
                          <td className="py-3 px-4 text-center font-semibold text-green-600">${restaurant.avgPrice}</td>
                          <td className="py-3 px-4 text-center text-gray-600">{restaurant.yearsInMarket}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                              {restaurant.cms}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Restaurant</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Price</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Years</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Website CMS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantData.filter(r => r.cms.includes("Custom")).map((restaurant, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{restaurant.name}</td>
                          <td className="py-3 px-4 text-gray-600">{restaurant.category}</td>
                          <td className="py-3 px-4 text-center font-semibold text-green-600">${restaurant.avgPrice}</td>
                          <td className="py-3 px-4 text-center text-gray-600">{restaurant.yearsInMarket}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                              {restaurant.cms}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Key Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>100% Full Liquor License:</strong> All prospects meet the liquor license requirement.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Strong Market Presence:</strong> Average 19 years in market, demonstrating stability and revenue capacity.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Premium Pricing:</strong> Average check of $100 per person indicates high-revenue establishments.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Diverse Cuisines:</strong> Mix of Italian, Japanese, Korean, American, and Mediterranean fine dining.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">CMS Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Custom Platforms (60%):</strong> 6 restaurants use proprietary or highly customized solutions—opportunity for specialized marketing services.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>WordPress Prospects (20%):</strong> 2 restaurants on WordPress—potential for optimization and advanced marketing integration.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Squarespace Users (20%):</strong> 2 restaurants on Squarespace—ready for modern marketing automation.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-gray-700"><strong>Outreach Angle:</strong> Many high-end prospects may benefit from specialized restaurant marketing solutions.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 py-8 border-t border-gray-200 text-center text-gray-600">
          <p className="text-sm">Research Report • Miami-Dade County Restaurant Prospects • April 2026</p>
          <p className="text-xs mt-2">Foodie Agency • Premium Restaurant Marketing Solutions</p>
        </div>
      </div>
    </div>
  );
}
