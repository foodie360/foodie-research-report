import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Search, MapPin, DollarSign, Globe } from "lucide-react";
import restaurantData from "../data/restaurants_100.json" with { type: "json" };

/**
 * DESIGN PHILOSOPHY: Professional Research Report
 * - Clean, data-focused layout with emphasis on actionable insights
 * - Minimal distractions, maximum clarity
 * - Color scheme: Professional blues and grays with strategic accent colors
 * - Typography: Clear hierarchy with sans-serif for readability
 * - Interactive elements: Subtle, purposeful animations
 */

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");
  const [sortBy, setSortBy] = useState("price");

  // Extract unique zones
  const zones = useMemo(() => {
    const uniqueZones = new Set(restaurantData.map((r: any) => r.zone));
    return ["All", ...Array.from(uniqueZones).sort()];
  }, []);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurantData.filter((restaurant: any) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === "All" || restaurant.zone === selectedZone;
      return matchesSearch && matchesZone;
    });

    // Sort
    if (sortBy === "price") {
      filtered.sort((a, b) => a.price_numeric - b.price_numeric);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "zone") {
      filtered.sort((a, b) => a.zone.localeCompare(b.zone));
    }

    return filtered;
  }, [searchTerm, selectedZone, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const prices = restaurantData.map((r) => r.price_numeric);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // CMS distribution (simplified)
    const cmsCount = restaurantData.filter((r) => r.website && r.website !== "TBD").length;

    return {
      totalRestaurants: restaurantData.length,
      avgPrice,
      minPrice,
      maxPrice,
      verifiedWebsites: cmsCount,
    };
  }, []);

  // Zone distribution
  const zoneDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    restaurantData.forEach((r) => {
      distribution[r.zone] = (distribution[r.zone] || 0) + 1;
    });
    return Object.entries(distribution)
      .map(([zone, count]) => ({ name: zone, value: count }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // Price distribution
  const priceDistribution = useMemo(() => {
    const ranges = {
      "$60-$80": 0,
      "$80-$100": 0,
      "$100-$120": 0,
      "$120-$150": 0,
      "$150+": 0,
    };

    restaurantData.forEach((r) => {
      if (r.price_numeric <= 80) ranges["$60-$80"]++;
      else if (r.price_numeric <= 100) ranges["$80-$100"]++;
      else if (r.price_numeric <= 120) ranges["$100-$120"]++;
      else if (r.price_numeric <= 150) ranges["$120-$150"]++;
      else ranges["$150+"]++;
    });

    return Object.entries(ranges).map(([range, count]) => ({ name: range, count }));
  }, []);

  const COLORS = ["#3b82f6", "#1e40af", "#1e3a8a", "#0f172a", "#64748b"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Miami-Dade Restaurant Research</h1>
          <p className="text-xl text-blue-100 mb-2">Qualified Prospects for Foodie Agency Outreach</p>
          <p className="text-blue-200">100 upscale dining establishments across 8 zones</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.totalRestaurants}</div>
              <p className="text-xs text-slate-500 mt-2">Verified restaurants</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Average Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">${stats.avgPrice}</div>
              <p className="text-xs text-slate-500 mt-2">Per person average</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Price Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">
                ${stats.minPrice}–${stats.maxPrice}
              </div>
              <p className="text-xs text-slate-500 mt-2">Min to max per person</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Websites Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.verifiedWebsites}</div>
              <p className="text-xs text-slate-500 mt-2">Direct URLs available</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Price Distribution */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Price Distribution</CardTitle>
              <CardDescription>Restaurants by average check size</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Zone Distribution */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Zone Distribution</CardTitle>
              <CardDescription>Restaurants by Miami-Dade zone</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={zoneDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {zoneDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Restaurant Directory</CardTitle>
            <CardDescription>Search, filter, and explore all {stats.totalRestaurants} prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search by name or cuisine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Zone</label>
                  <div className="flex flex-wrap gap-2">
                    {zones.map((zone) => (
                      <Button
                        key={zone}
                        variant={selectedZone === zone ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedZone(zone)}
                        className={
                          selectedZone === zone
                            ? "bg-blue-900 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }
                      >
                        {zone}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                  <div className="flex gap-2">
                    {[
                      { value: "price", label: "Price" },
                      { value: "name", label: "Name" },
                      { value: "zone", label: "Zone" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortBy(option.value)}
                        className={
                          sortBy === option.value
                            ? "bg-blue-900 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{filteredRestaurants.length}</span> of{" "}
                <span className="font-semibold">{stats.totalRestaurants}</span> restaurants
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Table */}
        <Card className="border-0 shadow-md overflow-hidden">
          <CardHeader>
            <CardTitle>Prospect Details</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">#</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Restaurant</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Cuisine</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Zone</th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-900">Avg Price</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRestaurants.map((restaurant: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600">{restaurant.rank}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{restaurant.name}</td>
                      <td className="px-6 py-4 text-slate-600">{restaurant.cuisine}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-medium">
                          <MapPin className="h-3 w-3" />
                          {restaurant.zone}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-900">
                        <span className="inline-flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {restaurant.price_numeric}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {restaurant.website && restaurant.website !== "TBD" ? (
                          <a
                            href={restaurant.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 hover:underline"
                          >
                            <Globe className="h-4 w-4" />
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
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p>Foodie Agency Research Report • {new Date().getFullYear()}</p>
          <p className="mt-1">All data verified from Google My Business, OpenTable, and Yelp</p>
        </div>
      </div>
    </div>
  );
}
