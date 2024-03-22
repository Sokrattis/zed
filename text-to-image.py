# pip install git+https://github.com/huggingface/diffusers
# pip install transformers accelerate scipy safetensors

# pip uninstall torch
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Open the Start menu and type "gpedit.msc" in the search bar. Press Enter to open the Local Group Policy Editor.
# In the editor, navigate to "Computer Configuration" > "Administrative Templates" > "System" > "Filesystem".
# Double-click the "Enable Win32 long paths" policy and set it to "Enabled".

from diffusers import DiffusionPipeline
from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
from diffusers.utils import make_image_grid
import torch
# torch.cuda.is_available()

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, safety_checker=None, use_safetensors=True)
pipe.to("cuda")

neg_prompt = "drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, shallow depth of field, bokeh, (worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch) , tooth, dull, blurry, watermark, low quality, (flash:1.2) , bra, makeup, hat, tattoo, snow, black and white"
prompt="an enlighted being, intricate, detailed, fashion photography, large depth of field, deep depth of field, highly detailed, sharp focus, cinematic lighting, atmospheric, ultra photoreal, 8k sharp focus"
#prompt="A beautiful girl, digital watercolor Illustration, summers cape sunrise, complex contrast, highly details, geometric Bauhaus abstract vector fractal, in style of Carne Griffiths, triadic colors, wave function"
image = pipe(prompt, height=720, width=1280, num_inference_steps=20, negative_prompt=neg_prompt).images[0]

image.save("image.png")

# Using generators
generator = [torch.Generator(device="cuda").manual_seed(i) for i in range(4)]
images = pipe(prompt, generator=generator, num_images_per_prompt=4).images
make_image_grid(images, rows=2, cols=2)

prompt = [prompt + t for t in [", highly realistic", ", artsy", ", trending", ", colorful"]]
generator = [torch.Generator(device="cuda").manual_seed(0) for i in range(4)]
images = pipe(prompt, generator=generator).images
make_image_grid(images, rows=2, cols=2)