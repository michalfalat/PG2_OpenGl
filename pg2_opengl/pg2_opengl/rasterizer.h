#ifndef RASTERIZER_H
#define RASTERIZER_H

#pragma once

#include "surface.h"
#include "camera.h"

class Rasterizer
{
public:
	Rasterizer(const int width, const int height, const float fov_y, const Vector3 view_from, const Vector3 view_at);
	~Rasterizer();


	int InitDevice();
	int realeaseDevice();

	void loadScene(const std::string file_name);
	void initMaterials();
	int initBuffers();

	int RenderFrame();

private:
	GLuint fragment_shader{ 0 };
	GLuint shader_program{ 0 };
	GLuint vertex_shader{ 0 };
	GLuint vao{ 0 };
	GLuint vbo{ 0 };
	GLFWwindow* window;
	int no_triangles;


	Camera camera;
	std::vector<Surface *> surfaces_;
	std::vector<Material *> materials_;
};

#endif