class ResponseHandler():
    @staticmethod
    def success(data):
        return {
            "status": True,
            "message": "Operação realizado com sucesso",
            "data": data,
            "errors": None
        }

    @staticmethod
    def error(errors):
        return {
            "status": True,
            "message": "Falha ao realizar a operação",
            "data": None,
            "errors": errors
        }

    @staticmethod
    def not_found():
        return {
            "status": False,
            "message": "Link não encontrado",
            "data": None,
            "errors": None
        }

