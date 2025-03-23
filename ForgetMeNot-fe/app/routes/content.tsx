import React, {useEffect, useState} from 'react';
import {Item} from "~/components/item";
import SearchBar from "~/components/searchbar";
import {Modal} from "~/modal/modal";
import {ItemDetails} from "~/modal/itemDetails";

async function getSections() {
    try {
        const response = await fetch('/api/sections');

        if (response.ok) {
            const sectionsList: string[] = await response.json();
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

export default function Content() {
    const authorList = ["M. Autora", "Martin Smith", "Maria Anders", "Michael Brown", "Megan Fox"];
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [sectionsList, setSectionsList] = useState<string[]>([]);
    const [tagsList, setTagsList] = useState<string[]>([]);

    useEffect(() => {
        // Fetch sections and set state
        getSections().then((data) => {
            setSectionsList(data);
        });

        // Fetch tags and set state
        getTags().then((data) => {
            setTagsList(data);
        });
    }, []);

    return (
        <div className={'flex'}>
            <div className={'flex flex-col w-[20%] h-full gap-5 items-center text-center'}>
                <button className={'btn btn--special'}>+ Pridaj</button>
                <div className={'content_filter'}>
                    Filtrovanie
                </div>

                <div className={'flex flex-wrap gap-3 justify-center'}>
                    {sectionsList.length > 0 ? (
                        sectionsList.map((section, index) => (
                            <div key={index}>
                                {section}
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
                {Array.from({length: 5}, (_, index) => (
                    <Item key={index} number={index + 1} onClick={setSelectedItem}></Item>
                ))}

                {selectedItem !== null && (
                    <ItemDetails
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        number={selectedItem}
                    />
                )}
            </div>
        </div>

    );
}
