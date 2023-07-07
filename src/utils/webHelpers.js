export const getBase64 = async (file, consumer) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let result = reader.result;
        let cutIdx = result.indexOf(",");
        consumer(result.substring(cutIdx + 1));
    }
    reader.onerror = (error) => {
        console.log(error)
    }
}