import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchLessonsPaginatedAsync,
	fetchMediaManagerAsync,
	createLessonMediaAsync,
	resetCreateLessonMedia,
	fetchLessonMediaPaginatedAsync,
	deleteLessonMediaAsync,
	selectLessonsPaginated,
	selectMediaManager,
	selectCreateLessonMedia,
	selectLessonMediaPaginated,
	selectDeleteLessonMedia,
} from "../../apis/slices/contentSlice";
import Headers from "../common/Headers";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const LinkLessonMedia = ({ isOpen }) => {
	const dispatch = useDispatch();

	const lessonsState = useSelector(selectLessonsPaginated);
	const mediaState = useSelector(selectMediaManager);
	const createState = useSelector(selectCreateLessonMedia);
	const lessonMediaState = useSelector(selectLessonMediaPaginated);
	const deleteLessonMediaState = useSelector(selectDeleteLessonMedia);

	const [page, setPage] = useState(1);
	const [lessonSearch, setLessonSearch] = useState("");
	const [mediaSearch, setMediaSearch] = useState("");
	const [lessonMediaPage, setLessonMediaPage] = useState(1);
	const [linkedMediaSearch, setLinkedMediaSearch] = useState("");

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
		// Multi-select of media and inline edit state
		const [selectedMediaList, setSelectedMediaList] = useState([]);
		const [editingMediaId, setEditingMediaId] = useState(null);
	const [deletingLessonMediaId, setDeletingLessonMediaId] = useState(null);

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

	useEffect(() => {
		const firstPage = 1;
		setLessonMediaPage(firstPage);
		setLinkedMediaSearch("");
		if (selectedLesson?.id) {
			dispatch(
				fetchLessonMediaPaginatedAsync({
					page: firstPage,
					limit: 10,
					search: "",
					lesson_id: selectedLesson.id,
				})
			);
		}
	}, [dispatch, selectedLesson?.id]);

	const lessonItems = useMemo(() => lessonsState?.data?.items || [], [lessonsState]);
	const mediaItems = useMemo(() => mediaState?.data?.items || [], [mediaState]);
	const lessonMediaItems = useMemo(() => lessonMediaState?.data?.items || [], [lessonMediaState]);
	const lessonMediaTotalPages = useMemo(
		() => Math.max(lessonMediaState?.data?.totalPages || 1, 1),
		[lessonMediaState]
	);
	const lessonMediaTotal = lessonMediaState?.data?.total || 0;

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

	// Helpers for multi-select and per-item edits
	const isMediaSelected = (id) => selectedMediaList.some((it) => it.id === id);
	const toggleSelectMedia = (m) => {
		if (!m || m.is_folder) return;
		setSelectedMedia(m);
		setSelectedMediaList((prev) => {
			const exists = prev.some((it) => it.id === m.id);
			if (exists) {
				return prev.filter((it) => it.id !== m.id);
			}
			return [
				...prev,
				{ id: m.id, name: m.name, path: m.path, title: m.name, thumbnail: "" },
			];
		});
	};
	const updateMediaTitle = (id, newTitle) => {
		setSelectedMediaList((prev) => prev.map((it) => (it.id === id ? { ...it, title: newTitle } : it)));
	};
	const removeMediaFromSelection = (id) => {
		setSelectedMediaList((prev) => prev.filter((it) => it.id !== id));
		if (selectedMedia?.id === id) setSelectedMedia(null);
	};
	const fileToBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	const handleThumbnailFileChange = async (id, file) => {
		if (!file) return;
		try {
			const b64 = await fileToBase64(file);
			setSelectedMediaList((prev) => prev.map((it) => (it.id === id ? { ...it, thumbnail: b64 } : it)));
			toast.success("Thumbnail selected");
		} catch (e) {
			toast.error("Failed to read thumbnail file");
		}
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

	const reloadLessonMedia = (pageOverride = lessonMediaPage, searchOverride = linkedMediaSearch) => {
		if (!selectedLesson?.id) return;
		dispatch(
			fetchLessonMediaPaginatedAsync({
				page: pageOverride,
				limit: 10,
				search: searchOverride,
				lesson_id: selectedLesson.id,
			})
		);
	};

	const handleSearchLinkedMedia = () => {
		if (!selectedLesson?.id) {
			toast.info("Select a lesson to view linked media.");
			return;
		}
		const sanitizedSearch = linkedMediaSearch?.trim() || "";
		setLinkedMediaSearch(sanitizedSearch);
		const firstPage = 1;
		setLessonMediaPage(firstPage);
		reloadLessonMedia(firstPage, sanitizedSearch);
	};

	const handlePrevLinkedMedia = () => {
		if (lessonMediaPage <= 1) return;
		const prev = lessonMediaPage - 1;
		setLessonMediaPage(prev);
		reloadLessonMedia(prev);
	};

	const handleNextLinkedMedia = () => {
		if (lessonMediaPage >= lessonMediaTotalPages) return;
		const next = lessonMediaPage + 1;
		setLessonMediaPage(next);
		reloadLessonMedia(next);
	};

	const handleResetLinkedMediaSearch = () => {
		if (!selectedLesson?.id) {
			setLinkedMediaSearch("");
			return;
		}
		const firstPage = 1;
		setLinkedMediaSearch("");
		setLessonMediaPage(firstPage);
		reloadLessonMedia(firstPage, "");
	};

	const handleDeleteLinkedMedia = async (id) => {
		if (!id || !selectedLesson?.id) return;
		const confirmed = window.confirm("Are you sure you want to delete this lesson media?");
		if (!confirmed) return;
		setDeletingLessonMediaId(id);
		const currentItemsCount = lessonMediaItems.length;
		const success = await dispatch(deleteLessonMediaAsync(id));
		if (success) {
			toast.success("Lesson media deleted.");
			const shouldGoPrev = lessonMediaPage > 1 && currentItemsCount === 1;
			const nextPage = shouldGoPrev ? lessonMediaPage - 1 : lessonMediaPage;
			setLessonMediaPage(nextPage);
			reloadLessonMedia(nextPage);
		} else {
			toast.error("Failed to delete lesson media.");
		}
		setDeletingLessonMediaId(null);
	};

	const handleSubmit = async () => {
		setFormError("");
		if (!selectedLesson?.id) {
			setFormError("Please select a lesson.");
			return;
		}

		const itemsToCreate = selectedMediaList.length
			? selectedMediaList
			: selectedMedia
				? [{ id: selectedMedia.id, name: selectedMedia.name, path: selectedMedia.path, title: title || selectedMedia.name, thumbnail }]
				: [];

		if (!itemsToCreate.length) {
			setFormError("Please select at least one media item.");
			return;
		}

		setSubmitting(true);
		try {
			let successCount = 0;
			let failureCount = 0;
			for (const item of itemsToCreate) {
				const payload = {
					title: (item.title || item.name || "").trim(),
					media_path: item.path,
					thumbnail: item.thumbnail || "",
					source_type: sourceType || "",
					content_type: contentType || "",
					active: Boolean(active),
					lesson_id: String(selectedLesson.id),
				};
				// eslint-disable-next-line no-await-in-loop
				const ok = await dispatch(createLessonMediaAsync(payload));
				if (ok) successCount += 1; else failureCount += 1;
			}
			if (successCount) {
				toast.success(`${successCount} item${successCount === 1 ? "" : "s"} linked successfully`);
				reloadLessonMedia(lessonMediaPage, linkedMediaSearch);
			}
			if (failureCount) {
				toast.error(`${failureCount} item${failureCount === 1 ? "" : "s"} failed to link`);
			}
			// Reset per-item selections but keep the chosen lesson
			setSelectedMedia(null);
			setSelectedMediaList([]);
			setTitle("");
			setThumbnail("");
			dispatch(resetCreateLessonMedia());
		} catch (e) {
			setFormError(e?.message || "Failed to create lesson media.");
			toast.error(e?.message || "Failed to create lesson media.");
		} finally {
			setSubmitting(false);
		}
	};

	const isLoadingAny =
		lessonsState.isLoading ||
		mediaState.isLoading ||
		submitting ||
		createState.isLoading ||
		lessonMediaState.isLoading;

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
				{/* Left column: Select Lesson */}
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
				{/* Middle column: Select Media */}
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
									onClick={() => (isFolder ? enterFolder(m) : toggleSelectMedia(m))}
									className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
										!isFolder && isMediaSelected(m.id) ? "bg-green-50" : ""
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
				{/* Right column: Link Lesson to Media form */}
				<div className="bg-white rounded-xl p-6">
					<h2 className="text-2xl font-bold mb-6">
						{selectedLesson?.name ? `Link Media to: ${selectedLesson.name}` : "Link Lesson to Media"}
					</h2>
					{/* Previously linked media */}
					<div className="mb-8">
						<div className="flex flex-col gap-2 mb-3 lg:flex-row">
							<input
								type="text"
								value={linkedMediaSearch}
								onChange={(e) => setLinkedMediaSearch(e.target.value)}
								className="flex-1 border rounded-lg px-3 py-2"
								placeholder="Search linked media"
								disabled={!selectedLesson}
							/>
							<div className="flex gap-2">
								<button
									className="px-4 py-2 bg-[#27AE60] text-white rounded-lg disabled:opacity-50"
									onClick={handleSearchLinkedMedia}
									disabled={!selectedLesson}
								>
									Search
								</button>
								<button
									className="px-4 py-2 border rounded-lg disabled:opacity-50"
									onClick={handleResetLinkedMediaSearch}
									disabled={!selectedLesson && !linkedMediaSearch}
								>
									Reset
								</button>
							</div>
						</div>
						<div className="border rounded-lg max-h-64 overflow-auto divide-y">
							{!selectedLesson && (
								<div className="px-3 py-4 text-sm text-gray-500">Select a lesson to view linked media.</div>
							)}
							{selectedLesson &&
								lessonMediaItems.map((media) => (
									<div key={media.id} className="px-3 py-3 flex flex-col gap-1">
										<div className="flex items-start justify-between gap-3">
											<div>
												<div className="font-medium">{media.title || media.media_path || `Media ${media.id}`}</div>
												<div className="text-xs text-gray-500 break-all">{media.media_path}</div>
												<div className="text-xs text-gray-500">
													{media.content_type || "N/A"} · {media.source_type || "N/A"} ·{" "}
													{media.active ? "Active" : "Inactive"}
												</div>
											</div>
											<button
												className="text-red-600 text-sm hover:underline disabled:opacity-50"
												onClick={() => handleDeleteLinkedMedia(media.id)}
												disabled={
													deleteLessonMediaState.isLoading && deletingLessonMediaId === media.id
												}
											>
												{deletingLessonMediaId === media.id && deleteLessonMediaState.isLoading
													? "Deleting..."
													: "Delete"}
											</button>
										</div>
										<div className="text-xs text-gray-400">
											ID: {media.id} · Linked on: {media.created_at || "N/A"}
										</div>
									</div>
								))}
							{selectedLesson && !lessonMediaItems.length && !lessonMediaState.isLoading && (
								<div className="px-3 py-4 text-sm text-gray-500">No media linked to this lesson yet.</div>
							)}
						</div>
						{lessonMediaState.error && selectedLesson && (
							<div className="text-sm text-red-600 mt-2">{lessonMediaState.error}</div>
						)}
						{selectedLesson && (
							<div className="flex flex-col gap-2 mt-3 text-sm text-gray-600 lg:flex-row lg:items-center lg:justify-between">
								<div>Total linked media: {lessonMediaTotal}</div>
								<div className="flex items-center gap-2">
									<button
										className="px-3 py-1 border rounded disabled:opacity-50"
										onClick={handlePrevLinkedMedia}
										disabled={lessonMediaPage <= 1}
									>
										Prev
									</button>
									<div>
										Page {lessonMediaPage} / {lessonMediaTotalPages}
									</div>
									<button
										className="px-3 py-1 border rounded disabled:opacity-50"
										onClick={handleNextLinkedMedia}
										disabled={lessonMediaPage >= lessonMediaTotalPages || !lessonMediaItems.length}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</div>
					{/* Selected media list */}
					<div className="space-y-3 mb-6">
						<div className="text-sm text-gray-600">
							Selected: {selectedMediaList.length} item{selectedMediaList.length === 1 ? "" : "s"}
						</div>
						{selectedMediaList.map((item) => (
							<div key={item.id} className="border rounded-lg p-3 flex flex-col gap-2">
								<div className="flex items-center justify-between gap-3">
									<div className="flex-1">
										{editingMediaId === item.id ? (
											<input
												className="w-full border rounded px-2 py-1"
												value={item.title}
												onChange={(e) => updateMediaTitle(item.id, e.target.value)}
												onBlur={() => setEditingMediaId(null)}
											/>
										) : (
											<button className="text-left font-medium hover:underline" onClick={() => setEditingMediaId(item.id)}>
												{item.title}
											</button>
										)}
										<div className="text-xs text-gray-500 break-all">{item.path}</div>
									</div>
									<button
										className="text-red-600 text-sm hover:underline"
										onClick={() => removeMediaFromSelection(item.id)}
									>
										Remove
									</button>
								</div>
								<div className="flex items-center gap-3">
									<input
										id={`thumb-${item.id}`}
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) => handleThumbnailFileChange(item.id, e.target.files?.[0])}
									/>
									<label htmlFor={`thumb-${item.id}`} className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-50">
										Upload Thumbnail
									</label>
									{item.thumbnail ? (
										<span className="text-xs text-green-700">Thumbnail selected</span>
									) : (
										<span className="text-xs text-gray-500">No thumbnail</span>
									)}
								</div>
							</div>
						))}
					</div>
					<div className="space-y-6">

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
			</div>
		</div>
	);
};

export default LinkLessonMedia;


