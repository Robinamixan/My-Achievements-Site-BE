export default function(request, response) {
    response.status(404).json({
        message: 'Endpoint was not found.',
    });
}