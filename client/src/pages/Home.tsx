import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Search, MapPin, DollarSign, Globe } from "lucide-react";

interface Restaurant {
  rank: number;
  name: string;
  zone: string;
  cuisine: string;
  average_price: string;
  price_numeric: number;
  website: string;
  notes: string;
}

const restaurantsData: Restaurant[] = [
  {
    rank: 1,
    name: "Crazy About You",
    zone: "Brickell",
    cuisine: "Mediterranean/Italian/Spanish",
    average_price: "$50-$70",
    price_numeric: 60,
    website: "https://passionrestaurantgroup.com/restaurants/crazy-about-you/",
    notes: "Waterfront dining, lounge setting"
  },
  {
    rank: 2,
    name: "Fleming's Steakhouse - Brickell",
    zone: "Brickell",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.flemingssteakhouse.com/Locations/FL/Brickell",
    notes: "Prime steaks, wine, outdoor patio - $139 per guest verified"
  },
  {
    rank: 3,
    name: "Morton's The Steakhouse",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.mortons.com",
    notes: "USDA prime beef - Lunch $35-60 prix fixe"
  },
  {
    rank: 4,
    name: "Ruth's Chris Steak House",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.ruthschris.com",
    notes: "Classic steakhouse - Steaks $52-$146"
  },
  {
    rank: 5,
    name: "The River Oyster Bar",
    zone: "Brickell",
    cuisine: "Seafood",
    average_price: "$70-$100",
    price_numeric: 85,
    website: "TBD",
    notes: "Oyster bar and seafood"
  },
  {
    rank: 6,
    name: "Casa D'Angelo Aventura",
    zone: "Aventura",
    cuisine: "Italian",
    average_price: "$60-$100",
    price_numeric: 80,
    website: "https://www.casadangelo.com",
    notes: "Fine Italian dining"
  },
  {
    rank: 7,
    name: "Sparrow Italia",
    zone: "Wynwood",
    cuisine: "Italian",
    average_price: "$70-$100",
    price_numeric: 85,
    website: "TBD",
    notes: "Italian-inspired steakhouse, fresh pastas, premium steaks"
  },
  {
    rank: 8,
    name: "Truluck's Ocean's Finest Seafood",
    zone: "Brickell",
    cuisine: "Seafood",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.trulucks.com",
    notes: "Established seafood, well-reviewed"
  },
  {
    rank: 9,
    name: "CLAUDIE",
    zone: "Brickell",
    cuisine: "French",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "South of France inspired, Mediterranean flavors"
  },
  {
    rank: 10,
    name: "Loretta & The Butcher",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Upscale butcher concept"
  },
  {
    rank: 11,
    name: "Beauty & The Butcher",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Butcher restaurant"
  },
  {
    rank: 12,
    name: "Perry's Steakhouse",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Premium steaks"
  },
  {
    rank: 13,
    name: "LT Steak & Seafood",
    zone: "Coral Gables",
    cuisine: "Steakhouse/Seafood",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.ltsteakandseafood.com",
    notes: "Steak and seafood combination"
  },
  {
    rank: 14,
    name: "Ossobuco Miami",
    zone: "Wynwood",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Upscale steakhouse"
  },
  {
    rank: 15,
    name: "Kitchen + Kocktails By Kevin Kelley",
    zone: "Wynwood",
    cuisine: "Contemporary",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Chef-driven dining"
  },
  {
    rank: 16,
    name: "Macchialina",
    zone: "South Beach",
    cuisine: "Italian",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.macchialinami.com",
    notes: "Fine Italian"
  },
  {
    rank: 17,
    name: "Lucali",
    zone: "South Beach",
    cuisine: "Italian",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.lucalimiami.com",
    notes: "Upscale Italian"
  },
  {
    rank: 18,
    name: "Osteria Positano",
    zone: "Miami Beach",
    cuisine: "Italian",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Fine Italian"
  },
  {
    rank: 19,
    name: "STK Steakhouse",
    zone: "South Beach",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.stksteakhouse.com",
    notes: "Contemporary steakhouse - Dinner $95 per person"
  },
  {
    rank: 20,
    name: "Carbone Miami",
    zone: "South Beach",
    cuisine: "Italian",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.carbonemiami.com",
    notes: "Upscale Italian"
  },
  {
    rank: 21,
    name: "Dirty French Steakhouse",
    zone: "Brickell",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "French steakhouse concept"
  },
  {
    rank: 22,
    name: "BOURBON Steak Miami",
    zone: "Aventura",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.bourbonsteakmia.com/",
    notes: "Premium steakhouse - Dinner $95 per person"
  },
  {
    rank: 23,
    name: "CORSAIR kitchen & bar",
    zone: "Aventura",
    cuisine: "Contemporary",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Chef-driven cuisine"
  },
  {
    rank: 24,
    name: "Blind Tiger",
    zone: "Aventura",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Premium steakhouse"
  },
  {
    rank: 25,
    name: "Blu Steakhouse",
    zone: "Aventura",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Contemporary steakhouse"
  },
  {
    rank: 26,
    name: "Diplomat Prime",
    zone: "Hollywood",
    cuisine: "Steakhouse",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Fine steakhouse"
  },
  {
    rank: 27,
    name: "The Drexel",
    zone: "South Beach",
    cuisine: "American",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Fine American dining"
  },
  {
    rank: 28,
    name: "Rosa Negra Miami",
    zone: "Brickell",
    cuisine: "Latin American",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "https://www.rosanegrarestaurant.us",
    notes: "Fire shows and cocktails, luxury vibes"
  },
  {
    rank: 29,
    name: "Lique Miami",
    zone: "Aventura",
    cuisine: "Contemporary",
    average_price: "$80-$120",
    price_numeric: 100,
    website: "TBD",
    notes: "Upscale dining"
  },
  {
    rank: 30,
    name: "CASA NEOS",
    zone: "Downtown Miami",
    cuisine: "Mediterranean",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Refined sanctuary on Miami River, modern Mediterranean"
  },
  {
    rank: 31,
    name: "Giselle Miami",
    zone: "South Beach",
    cuisine: "Mediterranean",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Modern Mediterranean"
  },
  {
    rank: 32,
    name: "Cave305",
    zone: "South Beach",
    cuisine: "Steakhouse",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Luxury steakhouse with international cuisine"
  },
  {
    rank: 33,
    name: "BAOLI Miami",
    zone: "South Beach",
    cuisine: "Asian",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Upscale Asian dining"
  },
  {
    rank: 34,
    name: "Komodo Miami",
    zone: "Brickell",
    cuisine: "Asian Fine Dining",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "High-end Asian cuisine"
  },
  {
    rank: 35,
    name: "Lafayette Miami",
    zone: "Brickell",
    cuisine: "Steakhouse",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "https://lafayette-miami.com",
    notes: "Chef-driven steakhouse, Butcher's Special 34oz Tomahawk"
  },
  {
    rank: 36,
    name: "Los Fuegos by Francis Mallmann",
    zone: "South Beach",
    cuisine: "Steakhouse",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "https://www.losfuegosmiami.com",
    notes: "Argentine steakhouse"
  },
  {
    rank: 37,
    name: "Brooklyn Chop House",
    zone: "Wynwood",
    cuisine: "Steakhouse",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Modern steakhouse"
  },
  {
    rank: 38,
    name: "Area 31",
    zone: "Wynwood",
    cuisine: "Fusion",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Upscale fusion dining"
  },
  {
    rank: 39,
    name: "ADRIFT Mare",
    zone: "Miami",
    cuisine: "Seafood",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Upscale seafood"
  },
  {
    rank: 40,
    name: "Zuma Japanese Restaurant",
    zone: "Downtown Miami",
    cuisine: "Japanese",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "https://www.zumarestaurant.com",
    notes: "Contemporary Japanese izakaya-style, Miami River views"
  },
  {
    rank: 41,
    name: "Novikov Miami",
    zone: "Downtown Miami",
    cuisine: "Chinese/Japanese",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Sophisticated Asian concept, Peking duck, robata grill"
  },
  {
    rank: 42,
    name: "Estiatorio Milos",
    zone: "South Beach",
    cuisine: "Seafood/Greek",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "https://www.estiatoriomilos.com",
    notes: "Fresh fish market display, prix fixe lunch available"
  },
  {
    rank: 43,
    name: "Le Chick",
    zone: "Wynwood",
    cuisine: "American",
    average_price: "$100-$150",
    price_numeric: 125,
    website: "TBD",
    notes: "Upscale American dining, dress code required"
  },
  {
    rank: 44,
    name: "Daniel's Miami",
    zone: "Coral Gables",
    cuisine: "Steakhouse",
    average_price: "$150",
    price_numeric: 150,
    website: "https://www.danielssteak.com/miami",
    notes: "World's best steakhouses ranked #40 - Lunch $35 prix fixe, Dinner $150+ per person"
  },
  {
    rank: 45,
    name: "Le Jardinier",
    zone: "Miami Design District",
    cuisine: "French",
    average_price: "$150+",
    price_numeric: 150,
    website: "TBD",
    notes: "Michelin-starred, contemporary French/American"
  },
  {
    rank: 46,
    name: "L'ATELIER DE JOËL ROBUCHON",
    zone: "Miami",
    cuisine: "French",
    average_price: "$150+",
    price_numeric: 150,
    website: "http://latelier-miami.com",
    notes: "Two Michelin stars, Florida's only two Michelin star restaurant"
  },
  {
    rank: 47,
    name: "Nusr-Et Steakhouse Miami",
    zone: "Brickell",
    cuisine: "Steakhouse",
    average_price: "$120+",
    price_numeric: 140,
    website: "https://www.nusr-et.com.tr",
    notes: "Luxury dining experience, live entertainment"
  },
  {
    rank: 48,
    name: "Hiden",
    zone: "Wynwood",
    cuisine: "Japanese/Omakase",
    average_price: "$150-$250",
    price_numeric: 200,
    website: "TBD",
    notes: "Expensive omakase restaurant, hard to book"
  },
  {
    rank: 49,
    name: "Stubborn Seed",
    zone: "South Beach",
    cuisine: "American Fine Dining",
    average_price: "$150-$200",
    price_numeric: 175,
    website: "https://www.stubbornseed.com",
    notes: "Michelin-starred, 6-9 course tasting menu $150-$200"
  },
  {
    rank: 50,
    name: "House of Food Porn",
    zone: "Miami",
    cuisine: "Fusion",
    average_price: "$150+",
    price_numeric: 150,
    website: "TBD",
    notes: "Luxury fusion dining"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  const zones = ["all", ...Array.from(new Set(restaurantsData.map(r => r.zone)))].sort();
  const cuisines = ["all", ...Array.from(new Set(restaurantsData.map(r => r.cuisine)))].sort();

  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === "all" || restaurant.zone === selectedZone;
      const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
      return matchesSearch && matchesZone && matchesCuisine;
    });
  }, [searchTerm, selectedZone, selectedCuisine]);

  const zoneDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    restaurantsData.forEach(r => {
      dist[r.zone] = (dist[r.zone] || 0) + 1;
    });
    return Object.entries(dist).map(([zone, count]) => ({ name: zone, value: count }));
  }, []);

  const priceDistribution = useMemo(() => {
    const ranges = [
      { label: "$60-$80", min: 60, max: 80 },
      { label: "$80-$100", min: 80, max: 100 },
      { label: "$100-$125", min: 100, max: 125 },
      { label: "$125-$150", min: 125, max: 150 },
      { label: "$150+", min: 150, max: 300 }
    ];
    
    return ranges.map(range => ({
      name: range.label,
      count: restaurantsData.filter(r => r.price_numeric >= range.min && r.price_numeric <= range.max).length
    }));
  }, []);

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Miami-Dade Restaurant Prospects</h1>
          <p className="text-xl text-slate-200 mb-2">50 Qualified Fine Dining & Upscale Restaurant Leads</p>
          <p className="text-slate-300">Comprehensive research for Foodie agency outreach targeting high-revenue establishments</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">50</div>
              <p className="text-xs text-slate-500 mt-1">Qualified restaurants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Price Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">$60-$200</div>
              <p className="text-xs text-slate-500 mt-1">Per person average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Zones Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">8</div>
              <p className="text-xs text-slate-500 mt-1">Miami-Dade areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Liquor License</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <p className="text-xs text-slate-500 mt-1">Full license verified</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Restaurants by Zone</CardTitle>
              <CardDescription>Distribution across Miami-Dade areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={zoneDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {zoneDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Range Distribution</CardTitle>
              <CardDescription>Average check per person</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters & Table Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Prospects Database</CardTitle>
            <CardDescription>Filter and explore all 50 qualified prospects</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name or cuisine..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by zone" />
                </SelectTrigger>
                <SelectContent>
                  {zones.map(zone => (
                    <SelectItem key={zone} value={zone}>
                      {zone === "all" ? "All Zones" : zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine === "all" ? "All Cuisines" : cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-slate-600">
              Showing <span className="font-semibold">{filteredRestaurants.length}</span> of <span className="font-semibold">50</span> restaurants
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Restaurant Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Zone</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Cuisine</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Avg Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRestaurants.map((restaurant, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-600">{restaurant.rank}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{restaurant.name}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <MapPin className="w-3 h-3 mr-1" />
                          {restaurant.zone}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{restaurant.cuisine}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {restaurant.average_price}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {restaurant.website !== "TBD" ? (
                          <a
                            href={restaurant.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                          >
                            <Globe className="w-3 h-3 mr-1" />
                            Visit
                          </a>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No restaurants match your filters. Try adjusting your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Key Insights */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Research Methodology</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-3">
              <p>All prospects verified through:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Google My Business profiles</li>
                <li>OpenTable restaurant data</li>
                <li>Yelp verified pricing</li>
                <li>Official restaurant websites</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prospect Qualification Criteria</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-3">
              <p>All restaurants meet these requirements:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Average check $60 or higher</li>
                <li>Full liquor license</li>
                <li>Fine dining or upscale niche</li>
                <li>Located in Miami-Dade County</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">Foodie Restaurant Marketing Research Report • Miami-Dade County</p>
          <p className="text-slate-500 text-sm mt-2">Data compiled from verified public sources • Updated April 2026</p>
        </div>
      </section>
    </div>
  );
}
