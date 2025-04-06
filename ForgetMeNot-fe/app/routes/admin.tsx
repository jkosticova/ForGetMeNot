import {useEffect, useState} from "react";
import {Table} from "~/components/table";
import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "admin"},
    ];
}

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

async function getItems() {
    try {
        const response = await fetch("/api/items");
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching items:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return [];
    }
}


async function getUserItems() {
    try {
        const response = await fetch(`/api/userItems?username=admin`);
        console.log(response)
        if (response.ok) {
            const data = await response.json();

            return data.items.map((item: any) => {
                const {title, year, author, section, tags, ...rest} = item;
                return rest;
            });
        } else {
            console.error("Error fetching user items:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return [];
    }
}


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

async function getSections() {
    try {
        const response = await fetch("/api/sections");
        if (response.ok) {
            const data = await response.json();
            return data.map((section: any) => ({
                name: section.name || section.section_name,
                section_type: section.section_type || "unknown",
            }));
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
    const [accounts, setAccounts] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [sections, setSections] = useState<any[]>([]);
    const [userItems, setUserItems] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);

    const [editRecord, setEditRecord] = useState<any>(null);
    const [editingType, setEditingType] = useState<string | null>(null);
    const [prevRecord, setPrevRecord] = useState<any>(null);

    const [activeTab, setActiveTab] = useState<string>('accounts');
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            const accountsData = await getAccounts();
            setAccounts(accountsData);

            const tagsData = await getTags();
            setTags(tagsData);

            const sectionsData = await getSections();
            setSections(sectionsData);

            const userItemsData = await getUserItems();
            setUserItems(userItemsData);

            const itemsData = await getItems();
            setItems(itemsData);
        };

        fetchData();
    }, []);

    const handleDelete = (record: string) => {

    };

    const handleEdit = (record: any, type: string) => {
        if (!prevRecord) {
            setPrevRecord(record);
        }

        setEditRecord(record);
        setEditingType(type);
    };

    const handleSaveEdit = async () => {
        if (editRecord) {
            console.log("Saving edited record:", editRecord);

            const data = {
                oldRecord: prevRecord,
                newRecord: editRecord,
            };

            try {
                switch (editingType) {
                    case "section":
                        const sectionResponse = await fetch("/api/sections", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        });

                        const sectionResult = await sectionResponse.json();

                        if (sectionResponse.ok) {
                            console.log("Section update saved");
                        } else {
                            console.log("Failed to save section update");
                        }
                        break;

                    case "tag":
                        const tagResponse = await fetch("/api/tags", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        });

                        const tagResult = await tagResponse.json();

                        if (tagResponse.ok) {
                            console.log("Tag update saved");
                        } else {
                            console.log("Failed to save tag update");
                        }
                        break;

                    case "item":
                        const itemResponse = await fetch("/api/items", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        });

                        const itemResult = await itemResponse.json();

                        if (itemResult.ok) {
                            console.log("Tag update saved");
                        } else {
                            console.log("Failed to save tag update");
                        }
                        break;

                    case "account":
                        let accountResponse = null;
                        if (data.oldRecord.username != data.newRecord.username) {
                            accountResponse = await fetch("/api/accounts", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            });
                            const accountResult = await accountResponse.json();

                            if (accountResponse.ok) {
                                console.log("Account update saved");
                            } else {
                                console.log("Failed to save account update");
                            }
                            break;
                        }

                        if (data.oldRecord.first_name != data.newRecord.first_name || data.oldRecord.last_name != data.newRecord.last_name) {
                            accountResponse = await fetch("/api/users", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            });
                            const accountResult = await accountResponse.json();

                            if (accountResponse.ok) {
                                console.log("User update saved");
                            } else {
                                console.log("Failed to save user update");
                            }
                            break;
                        }

                        break;

                    case "userItem":
                        console.log(data)
                        const userItemResponse = await fetch("/api/updateItems", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        });

                        const userItemResult = await userItemResponse.json();

                        if (userItemResult.ok) {
                            console.log("Item update saved");
                        } else {
                            console.log("Failed to save item update");
                        }
                        break;

                    default:
                        console.error("Unknown editing type:", editingType);
                        break;
                }
            } catch (error) {
                console.error("Error during saving section:", error);
            }


            setEditRecord(null);
            setEditingType(null);
        }
    };

    const handleCancelEdit = () => {
        setEditRecord(null);
        setEditingType(null);
    };

    const transformedAccountData = accounts.map(account => ({
        ...account,
        Actions: (
            <span className="flex space-x-4">
                <button
                    onClick={() => handleEdit(account, "account")}
                    className={'px-4 py-2 bg-[var(--green)] text-white rounded-md hover:bg-[var(--green-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300'}
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(account)}
                    className={'px-4 py-2 bg-[var(--red)] text-white rounded-md hover:bg-[var(--red-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300'}
                >
                    Delete
                </button>
            </span>
        ),
    }));

    const transformedTagsData = tags.map(tag => ({
        ...tag,
        Actions: (
            <span className="flex space-x-4">
                <button
                    onClick={() => handleEdit(tag, "tag")}
                    className={'px-4 py-2 bg-[var(--green)] text-white rounded-md hover:bg-[var(--green-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300'}
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(tag)}
                    className={'px-4 py-2 bg-[var(--red)] text-white rounded-md hover:bg-[var(--red-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300'}
                >
                    Delete
                </button>
            </span>
        ),
    }));

    const transformedSectionsData = sections.map(section => ({
        ...section,
        Actions: (
            <span className="flex space-x-4">
                <button
                    onClick={() => handleEdit(section, "section")}
                    className={'px-4 py-2 bg-[var(--green)] text-white rounded-md hover:bg-[var(--green-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300'}
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(section)}
                    className={'px-4 py-2 bg-[var(--red)] text-white rounded-md hover:bg-[var(--red-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300'}
                >
                    Delete
                </button>
            </span>
        ),
    }));

    const transformedUserItemsData = userItems.map(item => ({
        ...item,
        Actions: (
            <span className="flex space-x-4">
                <button
                    onClick={() => handleEdit(item, "userItem")}
                    className={'px-4 py-2 bg-[var(--green)] text-white rounded-md hover:bg-[var(--green-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300'}
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(item)}
                    className={'px-4 py-2 bg-[var(--red)] text-white rounded-md hover:bg-[var(--red-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300'}
                >
                    Delete
                </button>
            </span>
        ),
    }));

    const transformedItemsData = items.map(item => ({
        ...item,
        Actions: (
            <span>
                <button onClick={() => handleEdit(item, "item")}>Edit</button>
                <button onClick={() => handleDelete(item)}>Delete</button>
            </span>
        ),
    }));

    const accountColumns = accounts.length > 0 ? [...Object.keys(accounts[0]), "Actions"] : [];
    const tagColumns = tags.length > 0 ? [...Object.keys(tags[0]), "Actions"] : [];
    const sectionColumns = sections.length > 0 ? [...Object.keys(sections[0]), "Actions"] : [];
    const userItemColumns = userItems.length > 0 ? [...Object.keys(userItems[0]).filter(key => key !== 'id'), "Actions"] : [];
    const itemColumns = items.length > 0 ? [...Object.keys(items[0]), "Actions"] : [];

    const renderEditForm = () => {
        if (!editRecord || !editingType) return null;

        let formFields = [];

        formFields = Object.keys(editRecord).map((key) => ({
            label: key.replace(/_/g, " ").toUpperCase(),
            oldValue: prevRecord[key],
            newValue: editRecord[key],
            field: key,
        }));

        return (
            <form>
                <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Original Value</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Updated Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {formFields.map((field: any) => (
                        <tr key={field.field} className="odd:bg-white even:bg-gray-50">
                            <td className="px-4 py-2 text-gray-600 border-b">
                                <p>{field.oldValue}</p>
                            </td>
                            <td className="px-4 py-2 border-b">
                                <input
                                    type="text"
                                    value={field.newValue}
                                    onChange={(e) => {
                                        setEditRecord((prevRecord: any) => ({
                                            ...prevRecord,
                                            [field.field]: e.target.value,
                                        }));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="form-actions mt-4 flex space-x-4 justify-end">
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveEdit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    };


    return (
        <div className={'p-6 space-y-8'}>
            <div className={'flex space-x-4 border-b pb-4'}>
                <button
                    onClick={() => handleTabClick('accounts')}
                    className={`px-4 py-2 text-lg font-semibold ${activeTab === 'accounts' ? 'border-b-2 border--600' : ''}`}
                >
                    Manage Accounts
                </button>
                <button
                    onClick={() => handleTabClick('tags')}
                    className={`px-4 py-2 text-lg font-semibold ${activeTab === 'tags' ? 'border-b-2 border--600' : ''}`}
                >
                    Manage Tags
                </button>
                <button
                    onClick={() => handleTabClick('sections')}
                    className={`px-4 py-2 text-lg font-semibold ${activeTab === 'sections' ? 'border-b-2 border--600' : ''}`}
                >
                    Manage Sections
                </button>
                <button
                    onClick={() => handleTabClick('items')}
                    className={`px-4 py-2 text-lg font-semibold ${activeTab === 'items' ? 'border-b-2 border--600' : ''}`}
                >
                    Manage Items
                </button>
                <button
                    onClick={() => handleTabClick('userItems')}
                    className={`px-4 py-2 text-lg font-semibold ${activeTab === 'userItems' ? 'border-b-2 border--600' : ''}`}
                >
                    Manage Users Items
                </button>
            </div>

            <div className="mt-6">
                {activeTab === 'accounts' && (
                    <div className={'bg-white shadow-md rounded-lg overflow-hidden'}>
                        <Table data={transformedAccountData} columns={accountColumns}/>
                    </div>
                )}

                {activeTab === 'tags' && (
                    <div className={'bg-white shadow-md rounded-lg overflow-hidden'}>
                        <Table data={transformedTagsData} columns={tagColumns}/>
                    </div>
                )}

                {activeTab === 'sections' && (
                    <div className={'bg-white shadow-md rounded-lg overflow-hidden'}>
                        <Table data={transformedSectionsData} columns={sectionColumns}/>
                    </div>
                )}

                {activeTab === 'items' && (
                    <div className={'bg-white shadow-md rounded-lg overflow-hidden'}>
                        <Table data={transformedItemsData} columns={itemColumns}/>
                    </div>
                )}

                {activeTab === 'userItems' && (
                    <div className={'bg-white shadow-md rounded-lg overflow-hidden'}>
                        <Table data={transformedUserItemsData} columns={userItemColumns}/>
                    </div>
                )}
            </div>

            <br/>
            {renderEditForm()}
        </div>
    );
}
