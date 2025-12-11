import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
                Welcome to <span className="text-blue-600">Lelang</span>
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                Discover amazing deals and bid on unique items from sellers worldwide.
                Your journey to winning great auctions starts here.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/auctions">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Browse Auctions
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="py-16 px-4 bg-white">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                Popular Categories
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                {['Electronics', 'Fashion', 'Vintage', 'Home & Garden', 'Collectibles'].map(
                  (category) => (
                    <Card key={category} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Browse {category.toLowerCase()}</p>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                Why Choose Lelang?
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    title: 'Secure Bidding',
                    description: 'Safe and transparent bidding process with buyer protection.',
                  },
                  {
                    title: 'Wide Selection',
                    description: 'Thousands of items across multiple categories.',
                  },
                  {
                    title: 'Fair Pricing',
                    description: 'Competitive prices driven by real market demand.',
                  },
                ].map((feature) => (
                  <Card key={feature.title}>
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-blue-600 text-white">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Start Bidding?</h2>
              <p className="mb-8 text-lg">Join thousands of buyers and sellers on Lelang today.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
