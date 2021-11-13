# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.test import BaseTestCase


class TestVisualizingController(BaseTestCase):
    """VisualizingController integration test stubs"""

    def test_get_map(self):
        """Test case for get_map

        Get GBFS Map of the stations or free bike status
        """
        headers = { 
            'Accept': 'text/html',
        }
        response = self.client.open(
            '/api/v1/gbfs/{gbfs_system_id}/map'.format(gbfs_system_id='gbfs_system_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
