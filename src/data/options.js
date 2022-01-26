/*eslint-disable*/

const job_data = [
    { value: "student", label: "학생" },
    { value: "university", label: "대학생" },
    { value: "job-seeker", label: "취업준비생" },
    { value: "salaryman", label: "직장인" },
]

const category = [
    { value: "dev", label: "개발 / 프로그래밍" },
    { value: "design", label: "디자인 / 영상편집" },
    { value: "certifi", label: "자격증" },
    { value: "lang", label: "외국어" },
    { value: "official", label: "공무원" }
]

const place = [
    { value: "online", label: "온라인" },
    { value: "offline", label: "오프라인" }
]

const job_ko = {
    "student": "학생",
    "university" : "대학생",
    "job-seeker" : "취준생",
    "salaryman" : "직장인"
}

const options = {
    job_data,
    category,
    place,
    job_ko
}

export default options;