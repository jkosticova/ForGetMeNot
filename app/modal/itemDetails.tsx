import {Modal} from "~/modal/modal";
import React, {useEffect, useState} from "react";
import {Slider} from "~/components/slider";

type ItemProps = {
    number: number;
    onClick: (num: number) => void;
};

const ItemDetailsPage = ({number}: { number: number, }) => {
    const [dejValue, setDejValue] = useState<number>(0);
    const [ilustraciaValue, setIlustraciaValue] = useState<number>(0);
    const [zaverValue, setZaverValue] = useState<number>(0);
    const [hodnotenieValue, setHodnotenieValue] = useState((dejValue + ilustraciaValue + zaverValue) / 3);


    useEffect(() => {
        const newAverage = (dejValue + ilustraciaValue + zaverValue);
        setHodnotenieValue(newAverage);
    }, [dejValue, ilustraciaValue, zaverValue]);


    return (
        <div className={'w-[50vw] h-[70vh] overflow-y-auto'}>
            <div className={'flex gap-1 mb-5'}>
                <button className={'btn btn--special'}>Knihy</button>
            </div>

            <div className={'grid grid-cols-3 justify-between mb-3'}>
                <div className={'flex flex-col w-full gap-6 sm:w-auto'}>
                    <div>
                        Názov:
                        <input className={'p-2 mt-1 w-full sm:w-auto'} type="text" placeholder="Enter Názov"/>
                    </div>
                    <div>
                        Autor:
                        <input className={'p-2 mt-1 w-full sm:w-auto'} type="text"
                               placeholder="Enter Autor"/>
                    </div>
                    <div>
                        Odkaz:
                        <input className={'p-2 mt-1 w-full sm:w-auto'} type="text" placeholder="Enter Odkaz"/>
                    </div>
                    <div className={'flex flex-wrap gap-5 justify-between'}>
                        <div>
                            Sekcia:
                            <input className={'p-2 mt-1 w-full sm:w-auto'} type="text"
                                   placeholder="Enter Sekcia"/>
                        </div>
                    </div>
                </div>

                <div className={'flex'}>
                    <div className={'flex flex-col justify-around sm:w-auto'}>
                        <div>
                            Ilustrátor:
                            <input className={'p-2 mt-1 w-full sm:w-auto'} type="text"
                                   placeholder="Enter Ilustrátor"/>
                        </div>
                        <div>
                            Tagy:
                            <input className={'p-2 mt-1 w-full sm:w-auto'} type="text" placeholder="Enter Tagy"/>
                        </div>
                    </div>
                </div>

                <div className={'flex flex-col items-center w-full sm:w-auto'}>
                    <div className={'flex flex-wrap gap-2'}>
                        <div>Dokončená séria:</div>
                        <div>Áno</div>
                        <>/</>
                        <div>Nie</div>
                    </div>

                    <img className={'w-[15vw] rounded-xl mt-3 mb-3'} alt={'sdf'} src={'./book-icon.svg'}/>

                    <div className={'flex flex-col'}>
                        <div className={'flex flex-wrap gap-2'}>
                            <div>Ukončená:</div>
                            <div>Áno</div>
                            <>/</>
                            <div>Nie</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col gap-3 mb-3'}>
                <div>
                    Posledne videné:
                    <input className={'p-2 mt-1 w-full sm:w-auto'} type="text"
                           placeholder="Enter Posledne videné"/>
                </div>
                <div>Poznámky:</div>
                <textarea className={'p-2 mt-1 w-full'} placeholder="Enter your Poznámky"
                          rows={4}></textarea>
            </div>

            <div className={'w-[70%]'}>
                <Slider min={0} max={5} step={1} value={dejValue} onChange={setDejValue} label={'Dej'}/>
                <Slider min={0} max={5} step={1} value={ilustraciaValue} onChange={setIlustraciaValue}
                        label={'Ilustracia'}/>
                <Slider min={0} max={5} step={1} value={zaverValue} onChange={setZaverValue} label={'Zaver'}/>
                <Slider min={0} max={15} step={1} value={hodnotenieValue} onChange={setHodnotenieValue}
                        label={'Celkove hodnotenie'} disabled/>
            </div>

            <button className={'btn btn--special'}>Vymaž</button>
        </div>
    );
}
export const ItemDetails = ({isOpen, onClose, number}: {
    isOpen: boolean,
    onClose: () => void,
    number?: number,
}) => {
    if (!isOpen || number === undefined) return null;

    return (
        <Modal onClose={onClose}>
            <ItemDetailsPage number={number}></ItemDetailsPage>
        </Modal>
    );
};