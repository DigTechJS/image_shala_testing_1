const Jimp=require("jimp");
async function applyWatermark(originalImagePath, logoImagePath, outputImagePath) {
    // try {
      // Read the original image and watermark logo
      const image = await Jimp.read(originalImagePath);
      const logo = await Jimp.read(logoImagePath);
  
      // Resize logo if needed (optional)
      const logoWidth = image.bitmap.width / 10; // Adjust resize ratio
      const logoHeight = Jimp.AUTO;
      await logo.resize(logoWidth, logoHeight);
  
      // Calculate watermark position (adjust as needed)
      const xMargin = image.bitmap.width * 0.05;
      const yMargin = image.bitmap.height * 0.05;
      const X = image.bitmap.width - logo.bitmap.width - xMargin;
      const Y = image.bitmap.height - logo.bitmap.height - yMargin;
  
      // Composite the watermark onto the image
      await image.composite(logo, X, Y, [Jimp.BLEND_DESTINATION_OVER]);
  
      // Write the watermarked image
      await image.write(outputImagePath);
      console.log(`Watermarked image saved to: ${outputImagePath}`);
      // res.status(200).json({ message: '`Watermarked image saved' });
    
  }

module.exports=applyWatermark