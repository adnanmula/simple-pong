export function getVectorX(speed, angle)
{	
	return speed * Math.cos(toRadians(angle));
}

export function getVectorY(speed, angle)
{
	return speed * Math.sin(toRadians(angle));
}

function toRadians(x)
{
	return x * (Math.PI / 180);
}
