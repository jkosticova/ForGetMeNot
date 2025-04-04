import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "admin" },
  ];
}

export default function AdminPage() {
    return (
        <div>
            <h1>Admin</h1>
        </div>
    )
}