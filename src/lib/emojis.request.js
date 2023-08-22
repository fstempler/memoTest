
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const fetchEmojis = async (count) => {
    try {
        const response = await fetch(
            'https://emoji-api.com/emojis?access_key=017205fb93f72a729dc3b78939797407d887ce2d'
        );
        const emojisData = await response.json();
        
        const emojis = emojisData.map((emoji) => emoji.character);

        const selectedEmojis = emojis.slice(0, count / 2);
        
        const duplicatedEmojis = selectedEmojis.flatMap((emoji) => [emoji, emoji]);

        const shuffledEmojis = shuffleArray(duplicatedEmojis);

        return shuffledEmojis.slice(0, count).map((emoji, index) => ({
            index,
            emoji,
            flipped: false,
        }));
    } catch (error) {
        console.error('Error fetching emojis:', error);
        return [];
    }
}
export default fetchEmojis;