export const apiCall = (link: string) => fetch(link).then((res) => res.json());
