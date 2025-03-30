import React, {useEffect, useState} from 'react';
import {Item} from "~/components/item";
import SearchBar from "~/components/searchbar";
import {ItemDetails} from "~/modal/itemDetails";

async function getSections() {
    try {
        const response = await fetch('/api/sections');

        if (response.ok) {
            const data = await response.json();

            const sectionsList: { name: string; section_type: string }[] = data.map((section: any) => ({
                name: section.name || section.section_name,
                section_type: section.section_type || "unknown",
            }));
            console.log(sectionsList);
            return sectionsList;
        } else {
            console.error('Error fetching sections:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return [];
    }
}

async function getTags() {
    try {
        const response = await fetch('/api/tags');

        if (response.ok) {
            const tagsList: string[] = await response.json();
            return tagsList;
        } else {
            console.error('Error fetching tags:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return [];
    }
}

async function getItems(username: string) {
    console.log('getItems', username);
    const getResponse = await fetch(`/api/userItems?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Check if GET request was successful
    if (getResponse.ok) {
        const itemsData = await getResponse.json();
        console.log('Fetched items:', itemsData);

        return itemsData;
        // Process the items data (e.g., display it in your UI)
    } else {
        const errorData = await getResponse.json();
        console.error('Error fetching items:', errorData.message);
        return [];
    }
}

export default function Content() {
    const authorList = ["M. Autora", "Martin Smith", "Maria Anders", "Michael Brown", "Megan Fox"];
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [sectionsList, setSectionsList] = useState<{ name: string; section_type: string }[]>([]);
    const [tagsList, setTagsList] = useState<string[]>([]);
    const [filteredSections, setFilteredSections] = useState<{ name: string; section_type: string }[]>([]);
    const [username, setUsername] = useState<string>('');
    const [userItems, setUserItems] = useState<[]>([]);

    useEffect(() => {
        getSections().then((data) => {
            setSectionsList(data);
            setFilteredSections(data);
        });

        getTags().then((data) => {
            setTagsList(data);
        });

        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
        console.log(username, ' hej ', savedUsername);

        if (savedUsername != null) {
            getItems(savedUsername).then((data) => {
                setUserItems(data.items);
            });
        }
    }, []);
    const handleAddButtonClick = () => {
        setSelectedItem([]);
    };

    const closeItem = () => {
        setSelectedItem(null);
    }

    const filterItemsAll = () => {
        setFilteredSections(sectionsList);
    }
    const filterItemsBooks = () => {
        setFilteredSections(sectionsList.filter(section => section.section_type === "Kniha"));
    }

    const filterItemsFilms = () => {
        setFilteredSections(sectionsList.filter(section => section.section_type === "Film"));
    }

    return (
        <div className={'flex flex-col'}>
            <div className={'w-full flex justify-between mb-3'}>
                <button className={'btn btn--special'} onClick={handleAddButtonClick}>
                    + Pridaj
                </button>

                <div>
                    <button className={'btn btn--special'} onClick={filterItemsBooks}>
                        Knihy
                    </button>

                    <button className={'btn btn--special'} onClick={filterItemsFilms}>
                        Filmy & Seriály
                    </button>

                    <button className={'btn btn--special'} onClick={filterItemsAll}>
                        Všetky
                    </button>
                </div>
            </div>

            <div className={'flex'}>
                <div className={'flex flex-col w-[20%] h-full gap-5 items-center text-center'}>

                    <div className={'content_filter'}>
                        Filtrovanie
                    </div>

                    <div className={'flex flex-wrap gap-3 justify-center'}>
                        {filteredSections.length > 0 ? (
                            filteredSections.map((section, index) => (
                                <div key={index}>
                                    {section.name}
                                </div>
                            ))
                        ) : (
                            <div>Žiadne dostupné sekcie</div>
                        )}
                    </div>

                    <div className={'border pl-3 pr-3 w-[80%]'}></div>

                    <div className={''}>
                        Autor:
                    </div>

                    <div className={'w-[80%]'}>
                        <SearchBar suggestions={authorList}/>
                    </div>

                    <div className={'border pl-3 pr-3 w-[80%]'}></div>

                    <div className={'content_filter'}>
                        Tagy:
                    </div>

                    <div className={'w-[80%]'}>
                        <SearchBar suggestions={tagsList}/>
                    </div>
                </div>

                <div className={'flex flex-wrap w-[80%] h-full mt-25 gap-7'}>
                    {userItems.length > 0 ? (
                            userItems.map((item: any, index) => (
                                <Item
                                    data={item}
                                    key={index}
                                    number={index + 1}
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))
                    ) : (
                        <div>No items found.</div>
                    )}

                    {selectedItem !== null && (
                        <ItemDetails
                            username={username}
                            data={selectedItem}
                            isOpen={true}
                            onClose={() => closeItem()}
                            tagsList={tagsList}
                            sectionList={sectionsList}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
