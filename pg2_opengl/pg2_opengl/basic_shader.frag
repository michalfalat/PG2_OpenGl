#version 460 core
#extension GL_ARB_bindless_texture : require
in vec3 unified_normal;
in vec2 texcoord;
in float normalLightDot;

out vec4 FragColor;

flat in int material_index;
//
struct Material
{
	vec3 diffuse;
	vec3 specular;
	vec3 ambient;
	sampler2D tex_diffuse;
};
//
layout ( std430, binding = 0 ) readonly buffer Materials
{
	Material materials[]; // only the last member can be unsized array
};

void main(void)
{
	vec4 ambientPart = vec4(materials[material_index].ambient.rgb, 1.0f);

	vec4 diffusePart = vec4(materials[material_index].diffuse.rgb *
		texture(materials[material_index].tex_diffuse, texcoord).rgb, 1.0f) * normalLightDot;

	FragColor = ambientPart + diffusePart;
	// FragColor = vec4( materials[material_index].diffuse.rgb *texture( materials[material_index].tex_diffuse, texcoord ).rgb, 1.0f );

	//FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	//FragColor = vec4((unified_normal.x + 1) * 0.5, (unified_normal.y + 1) * 0.5, (unified_normal.z + 1) * 0.5, 1.0f);
}
