import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from PIL.Image import Image

# from auth_token import huggingface_auth_token
import imagePrompt as _imagePrompt


# pipeline
#model_id = "CompVis/stable-diffusion-v1-4"
# pipe = StableDiffusionPipeline.from_pretrained(model_id, 
#                                                revision="fp16", 
#                                             #    torch_dtype=torch.float16, 
#                                             #    use_auth_token=huggingface_auth_token
#                                             )

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)


# device
device = "cuda"
pipe.to(device)

async def generate_image(imgPrompt: _imagePrompt.ImageCreate) -> Image: 
    generator = (
        None
        if imgPrompt.seed is None
        else torch.Generator().manual_seed(int(imgPrompt.seed))
    )
    with autocast(device): 
        image:Image = pipe(
            prompt=imgPrompt.prompt, 
            guidance_scale=imgPrompt.guidance_scale, 
            num_inference_steps=imgPrompt.num_inference_steps, 
            generator=generator
        ).images[0]


    return image