const axios = require('axios');
const fs = require('fs');

const KLING_API = 'https://api.kling.ai/v1/videos/text2video';
const CHANNEL_ID = process.env.CHANNEL_ID;

const prompts = [
  'An ordinary person suddenly reveals hidden superpowers. Energy auras erupt around them showing: super speed (lightning), super strength (fire), telepathy (brain waves), flight (wings). Multiple power visualizations appear simultaneously. Epic, cinematic, dramatic lighting, 4K blockbuster quality.',
  'A mysterious image with hidden encrypted messages. AI scanning beams reveal secret text and symbols glowing in neon. Decryption animation shows the hidden message appearing. Cyberpunk aesthetic, dark background, glowing green text, professional.',
  'A person\'s face generates a perfect AI doppelganger beside it. The AI version has slightly different expression, lighting, and styling. Both face each other in mirror effect. Digital particles connect them. Holographic, futuristic, 4K, mysterious atmosphere.'
];

const descriptions = [
  'Discover your hidden superpower with AI! #AI #Superpower #Shorts',
  'AI Discovers Hidden Messages 🤖✨ #AI #Mystery #Shorts',
  'Meet Your AI Doppelganger 🤖 #AI #Technology #Shorts'
];

const titles = [
  'AI Reveals Your Superpower 🤖✨',
  'AI Discovers Hidden Messages',
  'Meet Your AI Doppelganger'
];

async function generateVideo() {
  try {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    console.log('🎬 Generating video with Kling...');
    
    const klingResponse = await axios.post(KLING_API, {
      prompt: prompt,
      duration: 10,
      quality: '1080p'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.KLING_API_KEY}`
      }
    });
    
    const videoUrl = klingResponse.data.data.video_url;
    console.log('✅ Video generated:', videoUrl);
    
    fs.writeFileSync('video-data.json', JSON.stringify({
      videoUrl: videoUrl,
      title: title,
      description: description,
      channelId: CHANNEL_ID
    }));
    
    console.log('✅ Ready for YouTube upload!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateVideo();
