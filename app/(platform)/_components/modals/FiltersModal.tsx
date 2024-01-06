'use client';
import qs from 'query-string';
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from '../modalContent/Heading';
import SizeInput from '../inputs/SizeInput';
import Category from '../Categories/Category';
import useFiltersModal from '@/hooks/useFiltersModal';


const FiltersModal = () => {
    const router = useRouter();
    const filtersModal = useFiltersModal();
    const params = useSearchParams();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [height, setHeight] = useState(1);
    const [length, setLength] = useState(1);
    const [width, setWidth] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [price, setPrice] = useState<number | null>(null); // New state for price

    const onSubmit = useCallback(async () => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            height,
            length,
            width,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        if (price !== null) {
            updatedQuery.price = price;
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        filtersModal.onClose();
        router.push(url);
    }, [filtersModal, location, router, height, length, dateRange, width, price, params]);

    const actionLabel = useMemo(() => {
        return 'Search';
    }, []);

    const secondaryActionLabel = useMemo(() => {
        return 'Cancel';
    }, []);

    return (
        <Modal
            isOpen={filtersModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSubmit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={filtersModal.onClose}
            onClose={filtersModal.onClose}
            body={
                <div className="flex flex-col gap-8">
                    <Heading title="Enter your desired location" subtitle="Find the perfect place for renting an empty space!" />
                    <CountrySelect
                        value={location}
                        onChange={(value) => setLocation(value as CountrySelectValue)}
                    />
                    <hr />
                    <Heading title="When do you wanna rent?" subtitle="Select dates to find a best match!" />
                    <Calendar onChange={(value) => setDateRange(value.selection)} value={dateRange} />
                    <hr />
                    <Heading title="More information" subtitle="Find your perfect space!" />
                    <SizeInput
                        onChange={(value) => setHeight(value)}
                        value={height}
                        title="Height"
                        subtitle="Select a height"
                    />
                    <hr />
                    <SizeInput
                        onChange={(value) => setLength(value)}
                        value={length}
                        title="Length"
                        subtitle="Select a length"
                    />
                    <hr />
                    <SizeInput
                        onChange={(value) => setWidth(value)}
                        value={width}
                        title="Width"
                        subtitle="Select a width"
                    />
                    <hr />
                    <div className="flex flex-col">
                        <label className="font-semibold" htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price !== null ? price : ''}
                            onChange={(e) => setPrice(e.target.value !== '' ? parseFloat(e.target.value) : null)}
                            placeholder="Enter price"
                            className="border rounded p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold" htmlFor="price">Category:</label>
                        <Category />
                    </div>
                </div>
            }
        />
    );
};

export default FiltersModal;