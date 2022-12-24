// export default const x = 

const getPhotos = async (searchRequest, pageNumber) => {
  const params = {
    key: '29078045-8c2db167d821a84d590b709ce',
    image_type: 'photo',
    orientation: 'horizontal',
    q: searchRequest,
    page: pageNumber,
    per_page: 12,
  };

  const paramsInclude = new URLSearchParams([
    ...Object.entries(params),
  ]).toString();

  const new_url = new URL(`https://pixabay.com/api/?${paramsInclude}`).href;
  const response = await fetch(new_url);
  const responseDisplay = await response.json();
  return responseDisplay
}

export default getPhotos;