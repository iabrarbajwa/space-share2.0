'use client'
import useCreateSpaceModal from "@/hooks/useCreateSpaceModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../modalContent/Heading";
import { categories } from "../Categories/Category";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import SizeInput from "../inputs/SizeInput";
import ImageInput from "../inputs/ImageInput";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const CreateSpaceModal = () => {
    const router = useRouter();
    const createSpaceModal = useCreateSpaceModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const onBack = () => {
        setStep((val) => val - 1);
    }
    const onNext = () => {
        setStep((val) => val + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/spaces', data)
            .then(() => {
                toast.success('Space has been created successfully!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                createSpaceModal.onClose();
                router.push("/")
            })
            .catch(() => {
                toast.error("An error occurred while creating the space");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: '',
            imageSrc: '',
            category: "",
            location: null,
            height: 1,
            length: 1,
            width: 1,
            price: 1
        }
    })

    const category = watch('category');
    const location = watch('location');
    const height = watch('height');
    const length = watch('length');
    const width = watch('width');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back'
    }, [step])


    let bodyItems = (
        <div className="flex flex-col gap-8">
            <Heading
                title="What category best describes your empty space?"
                subtitle="Chooose a category"
            />
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((categoryItem) => (
                    <div key={categoryItem.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === categoryItem.label}
                            label={categoryItem.label}
                            icon={categoryItem.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyItems = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your space located?"
                    subtitle="Help renters find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyItems = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your space."
                    subtitle="What dimensions your space has?"
                />
                <SizeInput title="Height(ft)" subtitle="Approximate height in feet" value={height} onChange={(value) => setCustomValue('height', value)} /><hr />
                <SizeInput title="Length(ft)" subtitle="Approximate length in feet" value={length} onChange={(value) => setCustomValue('length', value)} /><hr />
                <SizeInput title="Width(ft)" subtitle="Approximate width in feet" value={width} onChange={(value) => setCustomValue('width', value)} />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyItems = (
            <div className="flex flex-col gap-0">
                <Heading
                    title="Add a picture of your space."
                    subtitle="Help renters see how your space look alike!"
                />
                <ImageInput value={imageSrc} onChange={(value) => { setCustomValue('imageSrc', value) }} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyItems = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Tell us more about the space"
                    subtitle="Describe it in detail about your space"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyItems = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Set price for your space."
                    subtitle="How much you would like to charge for one month?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }



    return (
        <Modal
            isOpen={createSpaceModal.isOpen}
            onClose={createSpaceModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Create your space"
            body={bodyItems}
        />

    )
}

export default CreateSpaceModal;