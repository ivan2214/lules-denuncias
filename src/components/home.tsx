import Link from "next/link";
import {LinkedinIcon, TwitterIcon, FacebookIcon} from "lucide-react";

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {CardTitle, CardHeader, CardContent, Card, CardFooter} from "@/components/ui/card";
import {getFilteredComplaints} from "@/actions/complaints/get-filtered-complaints";

import {Button} from "./ui/button";
import {Label} from "./ui/label";
import {BarChart} from "./ba-chart";
import {ComplaintCard} from "./complaint-card";

export async function Home() {
  const {complaints} = await getFilteredComplaints();

  if (!complaints.length) return <div>No complaints</div>;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full border-b py-12 md:py-24 lg:py-32">
          <div className="container space-y-10 px-4 md:px-6">
            <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Empower Your Community with Our Complaints Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Easily report and track community issues, from potholes to illegal dumping. Our
                  platform connects residents with local authorities to drive real change.
                </p>
                <div className="mt-6 space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Submit a Complaint
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg px-3 py-1 text-sm dark:bg-gray-800">
                  Community Empowerment
                </div>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Our platform gives residents a voice and a way to drive positive change in their
                  neighborhoods.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {complaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
              <div>
                <div className="flex flex-col items-start space-y-4">
                  <div className="inline-block rounded-lg  px-3 py-1 text-sm dark:bg-gray-800">
                    Explore Complaints
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    See What s Happening in Your Community
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Browse through recent community complaints and filter by location, category, or
                    status to stay informed.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="search">Search</Label>
                    <Input id="search" placeholder="Search complaints" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="filter">Filter</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="filter">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-6">
                  <BarChart className="aspect-[4/3] w-full" />
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Our Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      Our community complaints platform empowers residents to report and track
                      issues in their neighborhoods. We work closely with local authorities to
                      ensure your concerns are addressed.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link className="text-sm text-gray-500 hover:underline" href="#">
                      Learn More
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      Submitting a complaint is easy. Simply provide details about the issue,
                      including its location, and our platform will route it to the appropriate
                      authorities.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link className="text-sm text-gray-500 hover:underline" href="#">
                      Learn More
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>FAQs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      Find answers to common questions about our platform and the complaint process.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link className="text-sm text-gray-500 hover:underline" href="#">
                      Learn More
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full  py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg  px-3 py-1 text-sm dark:bg-gray-800">
                  Get Involved
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join the Movement for Change
                </h2>
                <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Help us build a better community by reporting issues, sharing our platform, and
                  getting involved with local initiatives.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Submit a Complaint
                </Link>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Share on Twitter</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <FacebookIcon className="h-5 w-5" />
                    <span className="sr-only">Share on Facebook</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Community Complaints. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
