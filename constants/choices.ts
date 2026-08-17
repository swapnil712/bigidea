export interface OptionType {
  id: string;
  label: string;
}

export const sortOptions : OptionType[] = [
  { id: "new", label: "Newest" },
  { id: "eta", label: "ETA" },
  { id: "progress", label: "Progress" },
]

export const formatOptions: OptionType[] = [
  { id: "microdrama", label: "Microdrama" },
  { id: "short-film", label: "Short Film" },
  { id: "feature-film", label: "Feature Film" },
  { id: "commercial", label: "Commercial" },
  { id: "music-video", label: "Music Video" },
  { id: "documentary", label: "Documentary" },
];

export const genreOptions: OptionType[] = [
  { id: "action-adventure", label: "Action/Adventure" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "horror", label: "Horror" },
  { id: "romance", label: "Romance" },
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "thriller", label: "Thriller" },
  { id: "fantasy", label: "Fantasy" },
];

export const aspectRatioOptions: OptionType[] = [
  { id: "9-16", label: "9:16" },
  { id: "16-9", label: "16:9" },
  { id: "1-1", label: "1:1" },
  { id: "4-5", label: "4:5" },
  { id: "21-9", label: "21:9" },
];

export const visualStyleOptions: OptionType[] = [
  { id: "hyper-realistic", label: "Hyper-realistic" },
  { id: "cinematic", label: "Cinematic" },
  { id: "anime", label: "Anime" },
  { id: "stop-motion", label: "Stop Motion" },
  { id: "watercolor", label: "Watercolor" },
  { id: "noir", label: "Noir" },
];

