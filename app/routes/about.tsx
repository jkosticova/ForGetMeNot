// app/routes/about.tsx
import type { Route } from "./+types/home";
import {AboutPage} from "~/components/about";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About Page" },
        { name: "description", content: "Learn more about our organization" }
    ];
}
export default function About() {
    return <AboutPage></AboutPage>
}