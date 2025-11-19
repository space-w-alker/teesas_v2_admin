import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchLessonsPaginatedAsync,
	fetchMediaManagerAsync,
	createLessonMediaAsync,
	resetCreateLessonMedia,
	selectLessonsPaginated,
	selectMediaManager,
	selectCreateLessonMedia,
} from "../../apis/slices/contentSlice";
import Headers from "../common/Headers";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const LinkLessonMedia = ({ isOpen }) => {
	const dispatch = useDispatch();

	const lessonsState = useSelector(selectLessonsPaginated);
	const mediaState = useSelector(selectMediaManager);
	const createState = useSelector(selectCreateLessonMedia);

	const [page, setPage] = useState(1);
	const [lessonSearch, setLessonSearch] = useState("");
	const [mediaSearch, setMediaSearch] = useState("");

	const [selectedLesson, setSelectedLesson] = useState(null);
	const [selectedMedia, setSelectedMedia] = useState(null);

	const [title, setTitle] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [sourceType, setSourceType] = useState("FILE");
	const [contentType, setContentType] = useState("PAID");
	const [mediaType, setMediaType] = useState("video");
	const [active, setActive] = useState(false);
	const [formError, setFormError] = useState("");
	const [submitting, setSubmitting] = useState(false);
		const [mediaStack, setMediaStack] = useState([]);

	// Dropdown options
	const mediaTypeOptions = [
		{ label: "Image", value: "image" },
		{ label: "Video", value: "video" },
		{ label: "Audio", value: "audio" },
		{ label: "PDF", value: "pdf" },
	];
	const sourceTypeOptions = [
		{ label: "File", value: "FILE" },
		{ label: "Embed", value: "EMBED" },
	];
	const contentTypeOptions = [
		{ label: "Free", value: "FREE" },
		{ label: "Paid", value: "PAID" },
		{ label: "Video", value: "VIDEO" },
	];

	useEffect(() => {
		dispatch(fetchLessonsPaginatedAsync({ page: 1, limit: 5, search: "" }));
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			fetchMediaManagerAsync({
				page: 1,
				limit: 10,
				search: "",
			})
		);
	}, [dispatch]);

	const lessonItems = useMemo(() => lessonsState?.data?.items || [], [lessonsState]);
	const mediaItems = useMemo(() => mediaState?.data?.items || [], [mediaState]);

	const handleSearchLessons = () => {
		setPage(1);
		dispatch(fetchLessonsPaginatedAsync({ page: 1, limit: 5, search: lessonSearch || "" }));
	};

	const handleSearchMedia = () => {
		dispatch(
			fetchMediaManagerAsync({
				page: 1,
				limit: 10,
				search: mediaSearch || "",
				parent_id: mediaStack[mediaStack.length - 1]?.id || "",
			})
		);
	};
	
	const enterFolder = (folder) => {
		if (!folder?.id) return;
		const nextStack = [...mediaStack, folder];
		setMediaStack(nextStack);
		dispatch(
			fetchMediaManagerAsync({
				page: 1,
				limit: 10,
				search: "",
				parent_id: folder.id,
			})
		);
	};
	
	const goUpOneLevel = () => {
		if (!mediaStack.length) return;
		const nextStack = mediaStack.slice(0, -1);
		setMediaStack(nextStack);
		const parentId = nextStack[nextStack.length - 1]?.id || "";
		dispatch(
			fetchMediaManagerAsync({
				page: 1,
				limit: 10,
				search: "",
				parent_id: parentId,
			})
		);
	};

	const handleNextLessons = () => {
		const next = page + 1;
		setPage(next);
		dispatch(fetchLessonsPaginatedAsync({ page: next, limit: 5, search: lessonSearch || "" }));
	};

	const handlePrevLessons = () => {
		const prev = Math.max(1, page - 1);
		setPage(prev);
		dispatch(fetchLessonsPaginatedAsync({ page: prev, limit: 5, search: lessonSearch || "" }));
	};

	const handleSubmit = async () => {
		setFormError("");
		if (!selectedLesson?.id) {
			setFormError("Please select a lesson.");
			return;
		}
		if (!selectedMedia?.path) {
			setFormError("Please select a media file.");
			return;
		}
		if (!title?.trim()) {
			setFormError("Title is required.");
			return;
		}
		const payload = {
			title: title.trim(),
			media_path: selectedMedia.path,
			thumbnail: thumbnail || "",
			source_type: sourceType || "",
			content_type: contentType || "",
			active: Boolean(active),
			lesson_id: String(selectedLesson.id),
		};
		setSubmitting(true);
		try {
			const ok = await dispatch(createLessonMediaAsync(payload));
			if (ok) {
				setTitle("");
				setThumbnail("");
				setSourceType("FILE");
				setContentType("PAID");
				setMediaType("video");
				setActive(false);
				setSelectedLesson(null);
				setSelectedMedia(null);
				setLessonSearch("");
				setMediaSearch("");
				dispatch(resetCreateLessonMedia());
				// success feedback
				toast.success("Lesson media created successfully.");
			} else {
				setFormError("Failed to create lesson media.");
				toast.error("Failed to create lesson media.");
			}
		} catch (e) {
			setFormError(e?.message || "Failed to create lesson media.");
			toast.error(e?.message || "Failed to create lesson media.");
		} finally {
			setSubmitting(false);
		}
	};

	const isLoadingAny = lessonsState.isLoading || mediaState.isLoading || submitting || createState.isLoading;

	return (
		<div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
			{isLoadingAny && (
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 9999,
					}}
				>
					<TailSpin color="green" radius={5} />
				</div>
			)}
			<div className="mb-8">
				<Headers value1="Content" value2="Lessons" value3="Link Media" />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="bg-white rounded-xl p-6 lg:col-span-2">
					<h2 className="text-2xl font-bold mb-6">Link Lesson to Media</h2>
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full border rounded-lg px-3 py-2"
									placeholder="Enter title"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
								<select
									value={mediaType}
									onChange={(e) => setMediaType(e.target.value)}
									className="w-full border rounded-lg px-3 py-2 bg-white"
								>
									<option value="">Select media type</option>
									{mediaTypeOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
								<input
									type="text"
									value={thumbnail}
									onChange={(e) => setThumbnail(e.target.value)}
									className="w-full border rounded-lg px-3 py-2"
									placeholder="Thumbnail URL or path"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
								<select
									value={sourceType}
									onChange={(e) => setSourceType(e.target.value)}
									className="w-full border rounded-lg px-3 py-2 bg-white"
								>
									<option value="">Select source type</option>
									{sourceTypeOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
								<select
									value={contentType}
									onChange={(e) => setContentType(e.target.value)}
									className="w-full border rounded-lg px-3 py-2 bg-white"
								>
									<option value="">Select content type</option>
									{contentTypeOptions.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center gap-3">
								<input
									id="activeCheckbox"
									type="checkbox"
									checked={active}
									onChange={(e) => setActive(e.target.checked)}
								/>
								<label htmlFor="activeCheckbox" className="text-sm font-medium text-gray-700">
									Active
								</label>
							</div>
						</div>

						{formError && <div className="bg-red-50 text-red-600 p-3 rounded-lg">{formError}</div>}

						<button
							className="px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] disabled:opacity-50"
							onClick={handleSubmit}
							disabled={submitting}
						>
							{submitting ? "Submitting..." : "Create Lesson Media"}
						</button>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white rounded-xl p-6">
						<h3 className="text-xl font-bold mb-4">Select Lesson</h3>
						<div className="flex gap-2 mb-3">
							<input
								type="text"
								value={lessonSearch}
								onChange={(e) => setLessonSearch(e.target.value)}
								className="flex-1 border rounded-lg px-3 py-2"
								placeholder="Search lessons"
							/>
							<button
								className="px-4 py-2 bg-[#27AE60] text-white rounded-lg"
								onClick={handleSearchLessons}
							>
								Search
							</button>
						</div>
						<div className="border rounded-lg max-h-64 overflow-auto divide-y">
							{lessonItems.map((lesson) => (
								<div
									key={lesson.id}
									onClick={() => setSelectedLesson(lesson)}
									className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
										selectedLesson?.id === lesson.id ? "bg-green-50" : ""
									}`}
								>
									<div className="font-medium">{lesson.name}</div>
									<div className="text-xs text-gray-500">ID: {lesson.id}</div>
								</div>
							))}
							{!lessonItems.length && (
								<div className="px-3 py-4 text-sm text-gray-500">No lessons found.</div>
							)}
						</div>
						<div className="flex justify-between mt-3">
							<button
								className="px-3 py-1 border rounded"
								onClick={handlePrevLessons}
								disabled={page <= 1}
							>
								Prev
							</button>
							<div className="text-sm text-gray-600">Page {page}</div>
							<button className="px-3 py-1 border rounded" onClick={handleNextLessons}>
								Next
							</button>
						</div>
					</div>

					<div className="bg-white rounded-xl p-6">
						<h3 className="text-xl font-bold mb-4">Select Media</h3>
						<div className="flex items-center justify-between mb-2">
							<div className="text-sm text-gray-600 break-all">
								Path: /{mediaStack.map((f) => f.name).join("/")}
							</div>
							<button
								className="px-3 py-1 border rounded disabled:opacity-50"
								onClick={goUpOneLevel}
								disabled={!mediaStack.length}
							>
								Up
							</button>
						</div>
						<div className="flex gap-2 mb-3">
							<input
								type="text"
								value={mediaSearch}
								onChange={(e) => setMediaSearch(e.target.value)}
								className="flex-1 border rounded-lg px-3 py-2"
								placeholder="Search media"
							/>
							<button className="px-4 py-2 bg-[#27AE60] text-white rounded-lg" onClick={handleSearchMedia}>
								Search
							</button>
						</div>
						<div className="border rounded-lg max-h-64 overflow-auto divide-y">
							{mediaItems.map((m) => {
								const isFolder = Boolean(m?.is_folder);
								return (
									<div
										key={m.id}
										onClick={() => (isFolder ? enterFolder(m) : setSelectedMedia(m))}
										className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
											!isFolder && selectedMedia?.id === m.id ? "bg-green-50" : ""
										}`}
									>
										<div className="font-medium">
											{isFolder ? "[Folder] " : ""}
											{m.name}
										</div>
										<div className="text-xs text-gray-500 break-all">{m.path}</div>
									</div>
								);
							})}
							{!mediaItems.length && (
								<div className="px-3 py-4 text-sm text-gray-500">No media found.</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LinkLessonMedia;


