type ItemProps = {
    number: number;
    onClick: (num: number) => void;
};

export function Item({ number, onClick }: ItemProps) {
    return (
        <div className={'relative flex w-full h-full gap-4 max-w-[800px] p-6 bg-[var(--clr-surface-a20)] rounded-xl'}
             onClick={() => onClick(number)}
        >
            <img className={'w-[90px] rounded-xl'} alt={'sdf'} src={'./book-icon.svg'}/>

            <div className={'flex flex-col justify-between'}>
                <div>nazov {number}</div>
                <div>link.com</div>
            </div>

            <>
                <div className={'absolute top-5 right-5'}>kindle</div>
                <div className={'absolute bottom-5 right-5'}>#fantasy</div>
            </>
        </div>
    );
}