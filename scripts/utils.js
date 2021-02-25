export function getVectorX(speed, angle)
{	
	return speed * Math.cos(toRadians(angle));
}

export function getVectorY(speed, angle)
{
	return speed * Math.sin(toRadians(angle));
}

export function isOutside(instance)
{
	const layout = instance.layout;
	
	return instance.x < 0 || instance.y < 0 || instance.x > layout.width || instance.y > layout.height;
}

export function toRadians(x)
{
	return x * (Math.PI / 180);
}

export function toDegrees(x)
{
	return x * (180 / Math.PI);
}
