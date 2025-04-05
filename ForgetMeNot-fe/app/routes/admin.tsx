import { useEffect, useState } from "react";
import { Table } from "~/components/table";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "admin" },
    ];
}

// Async function to fetch accounts
async function getAccounts() {
    try {
        const response = await fetch("/api/accounts");
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching accounts:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return [];
    }
}

// Async function to fetch tags
async function getTags() {
    try {
        const response = await fetch("/api/tags");
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching tags:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return [];
    }
}

// Async function to fetch sections
async function getSections() {
    try {
        const response = await fetch("/api/sections");
        if (response.ok) {
            const data = await response.json();
            const sectionsList = data.map((section: any) => ({
                name: section.name || section.section_name,
                section_type: section.section_type || "unknown",
            }));
            return sectionsList;
        } else {
            console.error("Error fetching sections:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return [];
    }
}

export default function AdminPage() {
    // State hooks for accounts, tags, and sections
    const [userList, setUserList] = useState<any[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [sections, setSections] = useState<any[]>([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const accountsData = await getAccounts();
            setUserList(accountsData);

            const tagsData = await getTags();
            setTags(tagsData);

            const sectionsData = await getSections();
            setSections(sectionsData);
        };

        fetchData();
    }, []);

    // Handlers for editing and deleting
    const handleDelete = (id: string) => {
        setUserList(userList.filter(user => user.account_id !== id));
    };

    const handleEdit = (id: string) => {
        alert(`Edit user with account_id: ${id}`);
    };

    // Transformed data for user list, tags, and sections
    const transformedUserData = userList.map(user => ({
        ...user,
        Actions: (
            <span>
                <button onClick={() => handleEdit(user.account_id)}>Edit</button>
                <button onClick={() => handleDelete(user.account_id)}>Delete</button>
            </span>
        ),
    }));

    const transformedTagsData = tags.map(tag => ({
        tag,
        Actions: (
            <span>
                <button onClick={() => alert(`Edit tag: ${tag}`)}>Edit</button>
                <button onClick={() => alert(`Delete tag: ${tag}`)}>Delete</button>
            </span>
        ),
    }));

    const transformedSectionsData = sections.map(section => ({
        ...section,
        Actions: (
            <span>
                <button onClick={() => alert(`Edit section: ${section.name}`)}>Edit</button>
                <button onClick={() => alert(`Delete section: ${section.name}`)}>Delete</button>
            </span>
        ),
    }));

    // Determine the columns dynamically, ensuring "Actions" is always included
    const userColumns = userList.length > 0 ? [...Object.keys(userList[0]), "Actions"] : [];
    const tagColumns = tags.length > 0 ? ["tag", "Actions"] : [];
    const sectionColumns = sections.length > 0 ? [...Object.keys(sections[0]), "Actions"] : [];

    return (
        <div>
            <h1>Manage Accounts</h1>
            <Table data={transformedUserData} columns={userColumns} />

            <br />
            <h1>Manage Tags</h1>
            <Table data={transformedTagsData} columns={tagColumns} />
            <br />
            <h1>Manage Sections</h1>
            <Table data={transformedSectionsData} columns={sectionColumns} />
        </div>
    );
}
