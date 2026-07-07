"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    Card,
    TextField,
    TextArea,
    Input,
    InputGroup,
    Label,
    Description,
    FieldError,
    Select,
    ListBox,
    Chip,
    Separator,
    Button,
    ToggleButtonGroup,
    ToggleButton,
} from "@heroui/react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiClock, FiDollarSign, FiMapPin, FiSettings, FiVideo, FiCamera, FiX } from "react-icons/fi";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM",
];

const AddDoctorPage = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",
        description: "",
        image: "",                 
        consultationFee: "",
        workingDays: [],           // e.g. ["Mon", "Wed", "Fri"]
        startTime: null,
        endTime: null,
        maxAppointments: "",
        consultationType: "in-person", // "in-person" | "online"
    });




    
    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSelectChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleWorkingDaysChange = (keys) => {
        setFormData((prev) => ({ ...prev, workingDays: Array.from(keys) }));
    };

    // Img bb pic uploaded
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        //  client-side validation 
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("The image size cannot exceed 5MB.");
            return;
        }


        const localPreviewUrl = URL.createObjectURL(file);
        setImagePreview(localPreviewUrl);

        setUploadingImage(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: uploadFormData,
                }
            );

            const data = await res.json();

            if (!data.success) {
                throw new Error("Image upload failed.");
            }

        
            setFormData((prev) => ({ ...prev, image: data.data.url }));
            toast.success("Image upload success!");
        } catch (err) {
            toast.error(err.message);
            setImagePreview(null);
        } finally {
            setUploadingImage(false);
        }
    };

    // select remove img
    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //  Basic validation — faka thakle
        if (!formData.name || !formData.email || !formData.specialization) {
            toast.error("Please fill in all the required information.");
            return;
        }

        setSubmitting(true);
        
        try {
            const res = await fetch("http://localhost:5000/api/doctors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Doctor add It could not be done.");

            toast.success("The doctor has been successfully added.!");
            router.push("/dashboard/admin/all-doctors");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Card className="bg-[#0f172a] border border-gray-800">
                <Card.Header className="flex-row items-center gap-3 px-6 pt-6">
                    <div className="bg-blue-600 p-3 rounded-xl">
                        <HiOutlineUserAdd className="text-white" size={22} />
                    </div>
                    <div className="flex flex-col">
                        <Card.Title className="text-xl font-bold text-white">
                            Add New Doctor
                        </Card.Title>
                        <Card.Description className="text-sm text-gray-400">
                            Fill in the details to add a new doctor to the system.
                        </Card.Description>
                    </div>
                </Card.Header>

                <Separator className="bg-gray-800 mt-4" />

                <Card.Content className="px-6 py-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

                        {/* ================= LEFT COLUMN ================= */}
                        <div className="flex flex-col gap-4">

                            {/* 👉 Doctor Photo — ImgBB  uploaded */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Doctor Photo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 rounded-full bg-[#1e293b] border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Doctor preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FiCamera className="text-gray-500" size={22} />
                                        )}

                                        {uploadingImage && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="doctor-image"
                                            className="cursor-pointer inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] border border-gray-700 text-white text-sm px-4 py-2 rounded-lg transition"
                                        >
                                            <FiCamera size={14} />
                                            {formData.image ? "Change Photo" : "Upload Photo"}
                                        </label>
                                        <input
                                            id="doctor-image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                        />

                                        {formData.image && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="inline-flex items-center gap-1 text-red-400 text-xs hover:text-red-300 w-fit"
                                            >
                                                <FiX size={12} />
                                                Remove photo
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    JPG or PNG, max 5MB. Shown on the doctor's profile.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-blue-400 font-semibold">
                                <AiOutlineInfoCircle size={16} />
                                <span>Basic Information</span>
                            </div>

                            <TextField isRequired name="name">
                                <Label>Doctor Name</Label>
                                <Input placeholder="Enter doctor full name" value={formData.name} onChange={handleInputChange("name")} />
                                <FieldError />
                            </TextField>

                            <TextField isRequired type="email" name="email">
                                <Label>Email Address</Label>
                                <Input placeholder="Enter doctor email" value={formData.email} onChange={handleInputChange("email")} />
                                <FieldError />
                            </TextField>

                            <TextField isRequired name="specialization">
                                <Label>Specialization</Label>
                                <Input placeholder="e.g. Cardiology, Neurology, Dental" value={formData.specialization} onChange={handleInputChange("specialization")} />
                                <FieldError />
                            </TextField>

                            <TextField isRequired name="description">
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Write about the doctor's experience, skills, and background..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange("description")}
                                />
                                <Description>
                                    This will be shown to patients on the doctor details page.
                                </Description>
                                <FieldError />
                            </TextField>

                            <div className="flex items-center gap-2 text-green-400 font-semibold mt-2">
                                <FiDollarSign size={16} />
                                <span>Consultation Fee</span>
                            </div>

                            <TextField
                                isRequired
                                type="number"
                                name="consultationFee"
                            >
                                <Label>Consultation Fee (USD)</Label>
                                <InputGroup>
                                    <InputGroup.Prefix>$</InputGroup.Prefix>
                                    <InputGroup.Input
                                        placeholder="e.g. 50"
                                        value={formData.consultationFee}
                                        onChange={handleInputChange("consultationFee")}
                                    />
                                </InputGroup>
                                <Description>
                                    This amount will be charged via Stripe.
                                </Description>
                                <FieldError />
                            </TextField>
                        </div>

                        {/* ================= RIGHT COLUMN ================= */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-orange-400 font-semibold">
                                <FiClock size={16} />
                                <span>Availability</span>
                            </div>

                            {/* 👉 Working Days —  */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Working Days</Label>
                                <ListBox
                                    selectionMode="multiple"
                                    selectedKeys={new Set(formData.workingDays)}
                                    onSelectionChange={handleWorkingDaysChange}
                                    className="flex flex-row flex-wrap gap-2 p-2 border border-gray-700 rounded-lg"
                                >
                                    {WEEK_DAYS.map((day) => (
                                        <ListBox.Item key={day} id={day} textValue={day}>
                                            {day}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>

                                {formData.workingDays.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {formData.workingDays.map((day) => (
                                            <Chip key={day} size="sm" color="secondary">
                                                {day}
                                            </Chip>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <Select
                                    isRequired
                                    value={formData.startTime}
                                    onChange={handleSelectChange("startTime")}
                                    placeholder="Start time"
                                >
                                    <Label>Start Time</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {TIME_SLOTS.map((t) => (
                                                <ListBox.Item key={t} id={t} textValue={t}>
                                                    {t}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <Select
                                    isRequired
                                    value={formData.endTime}
                                    onChange={handleSelectChange("endTime")}
                                    placeholder="End time"
                                >
                                    <Label>End Time</Label>
                                    <Select.Trigger>
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                        <ListBox>
                                            {TIME_SLOTS.map((t) => (
                                                <ListBox.Item key={t} id={t} textValue={t}>
                                                    {t}
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                            <p className="text-xs text-gray-500 -mt-2">
                                Select the time range for consultations
                            </p>

                            <div className="flex items-center gap-2 text-purple-400 font-semibold mt-2">
                                <FiSettings size={16} />
                                <span>Additional Options</span>
                            </div>

                            <TextField
                                isRequired
                                type="number"
                                name="maxAppointments"
                            >
                                <Label>Max Appointments Per Day</Label>
                                <Input placeholder="e.g. 20" value={formData.maxAppointments} onChange={handleInputChange("maxAppointments")} />
                                <Description>
                                    Maximum number of patients this doctor can see per day.
                                </Description>
                                <FieldError />
                            </TextField>

                        </div>

                        {/* ================= FOOTER ACTIONS ================= */}
                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-800 mt-2">
                            <Button variant="secondary" onPress={() => router.back()}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                isPending={submitting}
                                isDisabled={uploadingImage}
                            >
                                {!submitting && <HiOutlineUserAdd size={16} />}
                                Add Doctor
                            </Button>
                        </div>
                    </form>
                </Card.Content>
            </Card>
        </div>
    );
};

export default AddDoctorPage;